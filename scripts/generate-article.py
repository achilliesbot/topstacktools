#!/usr/bin/env python3
"""
TopStackTools SEO Article Generator
Generates high-quality SEO articles using Claude and publishes them to the site.
Usage: python3 generate-article.py "best email marketing tools 2026"
"""

import sys
import json
import os
import re
import subprocess
import signal
import time
from datetime import datetime

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
MODEL = "claude-sonnet-4-20250514"
OPENAI_MODEL = "gpt-4o-mini"

SITE_DIR = "/home/ubuntu/topstacktools"
ARTICLES_PATH = os.path.join(SITE_DIR, "src/data/articles.json")
TOOLS_PATH = os.path.join(SITE_DIR, "src/data/tools.json")
SITEMAP_PATH = os.path.join(SITE_DIR, "public/sitemap.xml")
SITE_URL = "https://topstacktools.com"

# Live affiliate URL for Systeme.io
SYSTEME_AFFILIATE_URL = "https://systeme.io/?sa=sa026881943899075a2e173792837d9dece54a7e8b"

# Tools we review on the site — the AI should naturally reference these
REVIEWED_TOOLS = [
    {"slug": "hubspot-crm", "name": "HubSpot CRM", "category": "CRM"},
    {"slug": "notion", "name": "Notion", "category": "Project Management"},
    {"slug": "jasper-ai", "name": "Jasper AI", "category": "AI Writing"},
    {"slug": "hostinger", "name": "Hostinger", "category": "Web Hosting"},
    {"slug": "semrush", "name": "Semrush", "category": "SEO"},
    {"slug": "systeme-io", "name": "Systeme.io", "category": "Marketing/Funnels"},
]


def slugify(text):
    """Convert a title/topic into a URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s]+', '-', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text


def estimate_read_time(html_content):
    """Estimate read time from HTML content (approx 250 words/min)."""
    text = re.sub(r'<[^>]+>', '', html_content)
    words = len(text.split())
    minutes = max(1, round(words / 250))
    return f"{minutes} min read"


def pick_related_tools(topic):
    """Pick 2-3 related tools based on topic keywords."""
    topic_lower = topic.lower()
    scored = []
    for tool in REVIEWED_TOOLS:
        score = 0
        name_lower = tool["name"].lower()
        cat_lower = tool["category"].lower()
        if name_lower in topic_lower or tool["slug"].replace("-", " ") in topic_lower:
            score += 10
        for word in cat_lower.split():
            if word in topic_lower:
                score += 5
        keyword_map = {
            "hubspot-crm": ["crm", "sales", "customer", "lead", "pipeline", "free crm"],
            "notion": ["project", "management", "productivity", "wiki", "workspace", "notes", "solopreneur"],
            "jasper-ai": ["ai", "writing", "content", "copywriting", "ai tool", "chatgpt"],
            "hostinger": ["hosting", "website", "web host", "cheap", "wordpress", "builder", "domain"],
            "semrush": ["seo", "keyword", "backlink", "marketing", "ahrefs", "search"],
            "systeme-io": ["funnel", "email", "course", "marketing", "automation", "solopreneur", "cheap", "alternative"],
        }
        for kw in keyword_map.get(tool["slug"], []):
            if kw in topic_lower:
                score += 3
        scored.append((tool["slug"], score))

    scored.sort(key=lambda x: -x[1])
    # Always include at least systeme-io (our live affiliate) if relevant, plus top scorers
    selected = [s[0] for s in scored if s[1] > 0][:3]
    if len(selected) < 2:
        # Pad with systeme-io and hubspot as defaults
        for fallback in ["systeme-io", "hubspot-crm", "notion"]:
            if fallback not in selected:
                selected.append(fallback)
            if len(selected) >= 2:
                break
    return selected[:3]


def pick_affiliate_url(related_tools):
    """Pick the best affiliate URL based on related tools."""
    # Prefer systeme.io since we have a live affiliate link
    if "systeme-io" in related_tools:
        return SYSTEME_AFFILIATE_URL, "Try Systeme.io Free"
    url_map = {
        "hubspot-crm": (f"{SITE_URL}/go/hubspot", "Try HubSpot Free"),
        "notion": (f"{SITE_URL}/go/notion", "Try Notion Free"),
        "jasper-ai": (f"{SITE_URL}/go/jasper", "Try Jasper AI"),
        "hostinger": (f"{SITE_URL}/go/hostinger", "Get Hostinger Deal"),
        "semrush": (f"{SITE_URL}/go/semrush", "Try Semrush Free"),
        "systeme-io": (SYSTEME_AFFILIATE_URL, "Try Systeme.io Free"),
    }
    for tool in related_tools:
        if tool in url_map:
            return url_map[tool]
    return (f"{SITE_URL}/go/hubspot", "See Our Top Picks")


def pick_category(topic):
    """Infer a category from the topic."""
    topic_lower = topic.lower()
    category_keywords = {
        "CRM": ["crm", "customer relationship", "sales tool", "lead management"],
        "Project Management": ["project management", "task management", "productivity", "collaboration", "notion", "monday"],
        "AI Tools": ["ai", "artificial intelligence", "chatgpt", "jasper", "writing tool", "ai writing"],
        "Website Builders": ["website", "web hosting", "hosting", "builder", "domain", "wordpress"],
        "SEO & Marketing": ["seo", "keyword", "marketing", "backlink", "ahrefs", "semrush", "content marketing"],
        "Email Marketing": ["email", "newsletter", "email marketing", "mailchimp", "convertkit"],
        "Marketing": ["funnel", "automation", "systeme", "clickfunnels", "solopreneur", "entrepreneur"],
        "Accounting": ["accounting", "invoice", "bookkeeping", "quickbooks"],
    }
    for category, keywords in category_keywords.items():
        for kw in keywords:
            if kw in topic_lower:
                return category
    return "Tools & Software"


def _build_article_prompt(topic):
    """Build the article generation prompt."""
    tools_list = "\n".join([f"- {t['name']} ({t['category']}) - review at {SITE_URL}/reviews/{t['slug']}" for t in REVIEWED_TOOLS])
    return f"""Write a high-quality SEO blog article on the topic: "{topic}"

Target audience: Small business owners, solopreneurs, and online entrepreneurs researching software tools.

Requirements:
- 800-1200 words
- Write like an experienced human reviewer who has actually tested the tools, not like an AI
- Use a conversational but authoritative tone — be direct, share specific opinions
- Include specific pricing where relevant (current 2026 pricing)
- Include practical pros and cons, not generic fluff
- Add specific, actionable advice the reader can use today
- Use H2 and H3 headings for structure (as HTML tags)
- Where naturally relevant, reference one or more of these tools we review on our site:
{tools_list}
- When mentioning our reviewed tools, do so naturally as part of genuine recommendations — never force a mention
- Include a brief verdict or recommendation section at the end
- Do NOT include a title/H1 — that will be added separately
- Do NOT include any meta descriptions or frontmatter
- Output ONLY the article body as clean HTML (h2, h3, p, ul, li, strong, em tags only)
- No markdown, no code fences, no wrapper tags
- Make it genuinely useful — someone reading this should learn something they didn't know"""


def _generate_with_anthropic(prompt):
    """Try Anthropic API first."""
    import anthropic
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    response = client.messages.create(
        model=MODEL,
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text.strip()


def _generate_with_openai(prompt):
    """Fallback to OpenAI API."""
    import requests as req
    r = req.post("https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
        json={"model": OPENAI_MODEL, "messages": [{"role": "user", "content": prompt}], "max_tokens": 4096},
        timeout=60
    )
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"].strip()


def generate_article_content(topic):
    """Generate article content — tries Anthropic first, falls back to OpenAI."""
    prompt = _build_article_prompt(topic)

    # Try Anthropic first
    try:
        content = _generate_with_anthropic(prompt)
        print(f"  Generated via Anthropic ({MODEL})")
    except Exception as e:
        err_msg = str(e)
        if "credit balance" in err_msg.lower() or "billing" in err_msg.lower():
            print(f"  Anthropic credits depleted, falling back to OpenAI...")
        else:
            print(f"  Anthropic error ({err_msg[:100]}), falling back to OpenAI...")
        content = _generate_with_openai(prompt)
        print(f"  Generated via OpenAI ({OPENAI_MODEL})")

    # Clean up any markdown code fences if present
    if content.startswith("```html"):
        content = content[7:]
    if content.startswith("```"):
        content = content[3:]
    if content.endswith("```"):
        content = content[:-3]
    content = content.strip()

    return content


def generate_title_and_description(topic, article_html):
    """Generate an SEO-optimized title and meta description."""
    prompt = f"""Given this blog article topic: "{topic}"

Generate:
1. An SEO-optimized blog post title (50-65 characters, include the main keyword, make it compelling)
2. A meta description (120-155 characters, summarize the value, include a hook)

Return ONLY valid JSON in this exact format, nothing else:
{{"title": "Your Title Here", "description": "Your meta description here."}}"""

    try:
        text = _generate_with_anthropic(prompt)
    except Exception:
        text = _generate_with_openai(prompt)

    # Extract JSON from response
    match = re.search(r'\{[^}]+\}', text, re.DOTALL)
    if match:
        return json.loads(match.group())
    # Fallback
    return {
        "title": topic.title(),
        "description": f"Our hands-on guide to {topic}. Honest reviews, real pricing, and practical advice for 2026."
    }


def load_articles():
    """Load existing articles from JSON file."""
    with open(ARTICLES_PATH, 'r') as f:
        return json.load(f)


def save_articles(articles):
    """Save articles back to JSON file."""
    with open(ARTICLES_PATH, 'w') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)


def update_sitemap(slug):
    """Add the new article URL to sitemap.xml."""
    with open(SITEMAP_PATH, 'r') as f:
        sitemap = f.read()

    new_url = f'  <url><loc>{SITE_URL}/blog/{slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>'

    # Check if already in sitemap
    if f"/blog/{slug}" in sitemap:
        print(f"  Sitemap already contains /blog/{slug}")
        return

    # Insert before closing </urlset>
    sitemap = sitemap.replace('</urlset>', f'{new_url}\n</urlset>')

    with open(SITEMAP_PATH, 'w') as f:
        f.write(sitemap)

    print(f"  Added /blog/{slug} to sitemap.xml")


def rebuild_and_restart():
    """Run npm build and restart the Next.js server."""
    print("  Running npm run build...")
    build_result = subprocess.run(
        ["npm", "run", "build"],
        cwd=SITE_DIR,
        capture_output=True,
        text=True,
        timeout=300,
    )
    if build_result.returncode != 0:
        print(f"  Build failed: {build_result.stderr[:500]}")
        return False

    print("  Build succeeded. Restarting Next.js server...")

    # Kill existing next-server processes on port 3001
    try:
        kill_result = subprocess.run(
            ["bash", "-c", "lsof -ti:3001 | xargs -r kill -9"],
            capture_output=True,
            text=True,
            timeout=10,
        )
    except Exception:
        pass

    # Wait briefly for port to free up
    time.sleep(2)

    # Start the server in background
    subprocess.Popen(
        ["bash", "-c", f"cd {SITE_DIR} && nohup npm exec next start -- -p 3001 > /tmp/topstacktools.log 2>&1 &"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    print("  Next.js server restarting on port 3001")
    return True


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 generate-article.py \"your seo keyword topic\"")
        sys.exit(1)

    topic = sys.argv[1]
    print(f"Generating article for: \"{topic}\"")

    # Load existing articles to check for duplicates
    articles = load_articles()
    existing_slugs = {a["slug"] for a in articles}

    # Generate article content
    print("  Calling Claude API for article content...")
    article_html = generate_article_content(topic)

    # Generate title and description
    print("  Generating title and meta description...")
    meta = generate_title_and_description(topic, article_html)

    # Build the slug
    slug = slugify(meta["title"])
    # Ensure unique slug
    if slug in existing_slugs:
        slug = slug + "-" + datetime.now().strftime("%Y%m")
    if slug in existing_slugs:
        slug = slug + "-" + datetime.now().strftime("%d")

    # Determine related tools, affiliate URL, category
    related_tools = pick_related_tools(topic)
    affiliate_url, cta_text = pick_affiliate_url(related_tools)
    category = pick_category(topic)
    read_time = estimate_read_time(article_html)

    # Build the article object
    article = {
        "slug": slug,
        "title": meta["title"],
        "description": meta["description"],
        "date": datetime.now().strftime("%Y-%m-%d"),
        "author": "TopStackTools Team",
        "category": category,
        "readTime": read_time,
        "relatedTools": related_tools,
        "affiliateUrl": affiliate_url,
        "ctaText": cta_text,
        "content": article_html,
    }

    # Append to articles.json
    articles.append(article)
    save_articles(articles)
    print(f"  Article saved: {slug}")

    # Update sitemap
    update_sitemap(slug)

    # Rebuild and restart
    rebuild_and_restart()

    # Output summary
    print(f"\nArticle published successfully!")
    print(f"  Title: {meta['title']}")
    print(f"  Slug: {slug}")
    print(f"  Category: {category}")
    print(f"  Related tools: {', '.join(related_tools)}")
    print(f"  URL: {SITE_URL}/blog/{slug}")

    # Return the article as JSON for logging
    return json.dumps({"slug": slug, "title": meta["title"], "url": f"{SITE_URL}/blog/{slug}"})


if __name__ == "__main__":
    result = main()
    if result:
        print(result)
