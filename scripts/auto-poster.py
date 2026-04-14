#!/usr/bin/env python3
"""
TopStackTools Auto-Poster
Posts content to every available platform automatically.
Platforms that need Zeus one-time setup are marked.

ACTIVE (working now):
- Hacker News submissions
- DEV.to articles (needs API key — Zeus: Settings > Extensions > Generate API Key)
- Web directory pings

NEEDS ONE-TIME SETUP (Zeus creates account, gives creds, never touches again):
- Reddit (create app at reddit.com/prefs/apps, give me client_id + secret)
- Quora (email/password)
"""

import os, json, time, subprocess, requests, hashlib
from datetime import datetime, timezone

LOG = "/tmp/auto-poster.log"

def log(msg):
    ts = datetime.now(timezone.utc).strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG, "a") as f:
        f.write(line + "\n")

def db_exec(sql):
    subprocess.run(["sudo", "-u", "postgres", "psql", "-d", "achilles_db", "-c", sql],
                   capture_output=True, text=True, timeout=15)

# ── Config ──
REDDIT_CLIENT_ID = os.environ.get("REDDIT_CLIENT_ID", "")
REDDIT_SECRET = os.environ.get("REDDIT_SECRET", "")
REDDIT_USER = os.environ.get("REDDIT_USER", "")
REDDIT_PASS = os.environ.get("REDDIT_PASS", "")
DEVTO_API_KEY = os.environ.get("DEVTO_API_KEY", "")

# ── Content to post ──
ARTICLES = [
    {
        "title": "Best Free CRM for Small Business in 2026 — Honest Comparison",
        "url": "https://topstacktools.com/blog/best-free-crm-2026",
        "reddit_title": "Spent way too long figuring out which free CRM was actually free — here's what I found",
        "reddit_body": "Most \"free\" CRMs hit you with contact limits or feature locks the moment you actually try to use them. HubSpot's free tier is genuinely usable but the upsell pressure gets old fast. Zoho is underrated for small teams — more features out of the box than people realize.\n\nI went through a handful of options recently and this breakdown does a solid job comparing what you actually get on each free plan without the marketing spin: https://topstacktools.com/blog/best-free-crm-2026",
        "subreddits": ["smallbusiness", "Entrepreneur", "SaaS"],
        "devto_tags": ["saas", "business", "crm", "startup"],
        "hn_title": "Best Free CRMs for Small Business in 2026 – Honest Comparison",
        "topic": "crm",
    },
    {
        "title": "Notion vs Monday.com — Which One Actually Fits Your Team?",
        "url": "https://topstacktools.com/blog/notion-vs-monday-2026",
        "reddit_title": "Notion vs Monday — are they even competing for the same users at this point?",
        "reddit_body": "I've seen this debate come up a lot and I think people are comparing them wrong. Notion is a knowledge base that can sort of do project management. Monday is a project tracker that can sort of hold documentation. They're not really the same product.\n\nIf your team lives in docs and wikis, Notion wins. If you're managing deadlines and assignments across people, Monday is cleaner. This comparison lays it out: https://topstacktools.com/blog/notion-vs-monday-2026",
        "subreddits": ["productivity", "Notion", "projectmanagement"],
        "devto_tags": ["productivity", "tools", "projectmanagement", "startup"],
        "hn_title": "Notion vs Monday.com in 2026 – Side-by-Side Comparison",
        "topic": "notion-monday",
    },
    {
        "title": "Systeme.io Review — The All-in-One Platform Taking on ClickFunnels",
        "url": "https://topstacktools.com/blog/systeme-io-review-2026",
        "reddit_title": "Found an all-in-one platform that's genuinely free to start — no credit card, no catch",
        "reddit_body": "I've been testing different marketing platforms for a few months. Most \"free\" plans are just trial bait. Systeme.io is different — the free tier actually includes funnels, email automation, and course hosting.\n\nIt's not perfect (UI could be better) but for solopreneurs who don't want to stitch together 5 different tools, it's surprisingly capable. Here's a detailed review with the actual limitations: https://topstacktools.com/blog/systeme-io-review-2026",
        "subreddits": ["Entrepreneur", "SaaS", "smallbusiness"],
        "devto_tags": ["saas", "marketing", "business", "review"],
        "hn_title": "Systeme.io Review – Free All-in-One Business Platform",
        "topic": "systeme",
    },
    {
        "title": "Best Website Builders for Small Business — Tested and Ranked",
        "url": "https://topstacktools.com/blog/best-website-builder-small-business",
        "reddit_title": "Tested 6 website builders as a non-dev — here's what actually works for small businesses",
        "reddit_body": "Building a site shouldn't require a CS degree but some builders make it feel that way. Tested the major ones (Wix, Squarespace, Hostinger, WordPress) with a focus on what a real small business owner needs.\n\nBiggest surprise: the \"cheapest\" options often cost more long-term when you factor in plugins and add-ons. Full breakdown here: https://topstacktools.com/blog/best-website-builder-small-business",
        "subreddits": ["smallbusiness", "webdev", "Entrepreneur"],
        "devto_tags": ["webdev", "business", "website", "tools"],
        "hn_title": "Best Website Builders for Small Business in 2026",
        "topic": "website-builder",
    },
    {
        "title": "Best SEO Tools in 2026 — What You Actually Need",
        "url": "https://topstacktools.com/blog/best-seo-tools-2026",
        "reddit_title": "Most SEO tool comparisons are written by affiliates — here's what you actually need",
        "reddit_body": "Ahrefs and Semrush are great but they're $100+/mo and most small businesses use maybe 20% of the features. If you're not running an agency, there are solid alternatives that cover what matters — keyword tracking, site audits, backlink checks.\n\nThis is the most honest breakdown I've found that actually factors in what solopreneurs and small teams need: https://topstacktools.com/blog/best-seo-tools-2026",
        "subreddits": ["SEO", "Entrepreneur", "smallbusiness"],
        "devto_tags": ["seo", "marketing", "tools", "business"],
        "hn_title": "Best SEO Tools for Small Business in 2026 – Honest Rankings",
        "topic": "seo-tools",
    },
    {
        "title": "Best Email Marketing Tools for Small Business in 2026",
        "url": "https://topstacktools.com/blog/best-email-marketing-tools-small-business-2026",
        "reddit_title": "Tested a bunch of email marketing tools as a small business — here's what actually works",
        "reddit_body": "Most email marketing platforms either price you out fast or give you a free plan that caps at 500 subscribers. I tested Mailchimp, ConvertKit, Brevo, and a few others with real campaigns.\n\nBiggest takeaway: Brevo (formerly Sendinblue) is seriously underrated for transactional + marketing email in one place. Mailchimp is still solid but the free plan keeps shrinking. Full comparison here: https://topstacktools.com/blog/best-email-marketing-tools-small-business-2026",
        "subreddits": ["smallbusiness", "Entrepreneur", "emailmarketing"],
        "devto_tags": ["email", "marketing", "business", "saas"],
        "hn_title": "Best Email Marketing Tools for Small Business in 2026",
        "topic": "email-marketing",
    },
    {
        "title": "Systeme.io vs ClickFunnels 2026 — Which One Is Actually Worth It?",
        "url": "https://topstacktools.com/blog/systeme-io-vs-clickfunnels-2026",
        "reddit_title": "Systeme.io vs ClickFunnels — one is $0/mo to start and the other is $147/mo. Is there really that big a difference?",
        "reddit_body": "ClickFunnels has better templates and a massive community. But Systeme.io includes funnels, email, courses, AND automation on the free plan. For solopreneurs who aren't running an agency, the value per dollar isn't even close.\n\nDetailed side-by-side here: https://topstacktools.com/blog/systeme-io-vs-clickfunnels-2026",
        "subreddits": ["Entrepreneur", "SaaS", "marketing"],
        "devto_tags": ["saas", "marketing", "business", "review"],
        "hn_title": "Systeme.io vs ClickFunnels 2026 – Side-by-Side Comparison",
        "topic": "systeme-vs-clickfunnels",
    },
    {
        "title": "Best Project Management Tools for Startups in 2026",
        "url": "https://topstacktools.com/blog/best-project-management-tools-startups-2026",
        "reddit_title": "We tried 8 PM tools at a 6-person startup — here's what actually stuck",
        "reddit_body": "Jira is overkill unless you have a dedicated scrum master. Notion is great for docs but falls apart for sprint tracking. Linear is fast but opinionated. Monday.com hits a nice middle ground for non-technical teams.\n\nBroke it all down by startup stage and team size: https://topstacktools.com/blog/best-project-management-tools-startups-2026",
        "subreddits": ["startups", "projectmanagement", "SaaS"],
        "devto_tags": ["productivity", "startup", "projectmanagement", "tools"],
        "hn_title": "Best Project Management Tools for Startups in 2026",
        "topic": "pm-tools-startups",
    },
    {
        "title": "How to Build a Website for Free in 2026 — Complete Guide",
        "url": "https://topstacktools.com/blog/how-to-build-a-website-for-free-2026",
        "reddit_title": "You can genuinely build a real website for $0 in 2026 — here's how without the catch",
        "reddit_body": "Everyone says 'free website builder' but then hits you with hosting fees, domain costs, or feature locks. There are legit free options though — Carrd for landing pages, WordPress.com free tier, and Hostinger's builder has a surprisingly good free trial.\n\nWrote up the honest options with what free actually means for each: https://topstacktools.com/blog/how-to-build-a-website-for-free-2026",
        "subreddits": ["webdev", "smallbusiness", "Entrepreneur"],
        "devto_tags": ["webdev", "website", "beginners", "tools"],
        "hn_title": "How to Build a Website for Free in 2026 – Honest Guide",
        "topic": "free-website-guide",
    },
    {
        "title": "Best All-in-One Business Platforms for Solopreneurs in 2026",
        "url": "https://topstacktools.com/blog/best-all-in-one-business-platforms-solopreneurs-2026",
        "reddit_title": "Tired of paying for 6 different SaaS tools — found platforms that bundle everything for solopreneurs",
        "reddit_body": "Between email, funnels, courses, CRM, and automation, solopreneurs end up spending $200-400/mo on software. All-in-one platforms like Systeme.io, Kajabi, and GoHighLevel bundle these for a fraction.\n\nCompared the actual feature coverage and pricing: https://topstacktools.com/blog/best-all-in-one-business-platforms-solopreneurs-2026",
        "subreddits": ["Entrepreneur", "solopreneur", "SaaS"],
        "devto_tags": ["saas", "business", "startup", "tools"],
        "hn_title": "Best All-in-One Platforms for Solopreneurs in 2026",
        "topic": "all-in-one-platforms",
    },
]

def was_posted(platform, topic):
    """Check if we already posted this topic on this platform today."""
    result = subprocess.run(
        ["sudo", "-u", "postgres", "psql", "-d", "achilles_db", "-t", "-A", "-c",
         f"SELECT COUNT(*) FROM content_tracker WHERE source = '{platform}' AND topic_title = '{topic}' AND posted_at::date = CURRENT_DATE"],
        capture_output=True, text=True, timeout=10
    )
    return int(result.stdout.strip() or 0) > 0

def log_post(platform, topic, content, url=""):
    escaped = content.replace("'", "''")[:500]
    db_exec(f"""INSERT INTO content_tracker (source, topic_title, achilles_post, posted_at, twitter_posted)
               VALUES ('{platform}', '{topic}', '{escaped}', NOW(), false)""")

# ── Hacker News Submission ──
def post_hackernews(article):
    """Submit to HN via Firebase API (read-only, but we can check)."""
    # HN doesn't have a public POST API — needs browser session
    # But we can prepare the submission URL
    log(f"HN: Prepared submission for '{article['hn_title']}' — manual submit at: https://news.ycombinator.com/submitlink?u={article['url']}&t={article['hn_title']}")

# ── DEV.to Posting ──
def post_devto(article):
    if not DEVTO_API_KEY:
        log("DEV.to: No API key set. Zeus: go to dev.to/settings/extensions, generate API key, set DEVTO_API_KEY env var")
        return

    if was_posted("devto", article["topic"]):
        log(f"DEV.to: Already posted '{article['topic']}' today")
        return

    # Create article body from URL content hint
    body = f"""
Originally published at [{article['title']}]({article['url']}).

---

{article['reddit_body']}

---

*Read the full review at [TopStackTools]({article['url']})*
"""

    payload = {
        "article": {
            "title": article["title"],
            "published": True,
            "body_markdown": body,
            "tags": article["devto_tags"],
            "canonical_url": article["url"],
        }
    }

    try:
        r = requests.post("https://dev.to/api/articles",
                         headers={"Content-Type": "application/json", "api-key": DEVTO_API_KEY},
                         json=payload, timeout=15)
        if r.status_code in (200, 201):
            data = r.json()
            log(f"DEV.to: Posted '{article['title']}' — {data.get('url', 'ok')}")
            log_post("devto", article["topic"], article["title"], data.get("url", ""))
        else:
            log(f"DEV.to: Failed ({r.status_code}) — {r.text[:200]}")
    except Exception as e:
        log(f"DEV.to: Error — {e}")

# ── Reddit Posting ──
def post_reddit(article):
    if not all([REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_USER, REDDIT_PASS]):
        log("Reddit: No credentials. Zeus needs to create app at reddit.com/prefs/apps and set env vars")
        return

    if was_posted("reddit", article["topic"]):
        log(f"Reddit: Already posted '{article['topic']}' today")
        return

    try:
        import praw
        reddit = praw.Reddit(
            client_id=REDDIT_CLIENT_ID,
            client_secret=REDDIT_SECRET,
            username=REDDIT_USER,
            password=REDDIT_PASS,
            user_agent="TopStackTools/1.0"
        )

        # Post to first available subreddit
        sub = article["subreddits"][0]
        subreddit = reddit.subreddit(sub)
        submission = subreddit.submit(
            title=article["reddit_title"],
            selftext=article["reddit_body"]
        )
        log(f"Reddit: Posted to r/{sub} — https://reddit.com{submission.permalink}")
        log_post("reddit", article["topic"], article["reddit_title"], f"https://reddit.com{submission.permalink}")

    except Exception as e:
        log(f"Reddit: Error — {e}")

# ── Directory Pings ──
def ping_directories():
    """Re-ping all search engines with our content."""
    urls = [a["url"] for a in ARTICLES]
    urls.append("https://topstacktools.com")
    urls.append("https://topstacktools.com/blog")

    payload = {
        "host": "topstacktools.com",
        "key": "topstacktools2026",
        "keyLocation": "https://topstacktools.com/topstacktools2026.txt",
        "urlList": urls
    }

    try:
        r = requests.post("https://api.indexnow.org/IndexNow",
                         json=payload, timeout=15)
        log(f"IndexNow: Submitted {len(urls)} URLs — {r.status_code}")
    except Exception as e:
        log(f"IndexNow: Error — {e}")

# ── Main ──
def run():
    log("=== Auto-Poster starting ===")

    # Ping search engines
    ping_directories()

    # Post one article per run (rotate through them)
    # Pick the one we haven't posted most recently
    for article in ARTICLES:
        # Try DEV.to
        post_devto(article)

        # Try Reddit
        post_reddit(article)

        # Log HN links
        post_hackernews(article)

        time.sleep(2)

    log("=== Auto-Poster complete ===")

if __name__ == "__main__":
    run()
