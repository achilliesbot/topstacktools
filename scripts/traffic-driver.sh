#!/bin/bash
# TopStackTools Traffic Driver — runs daily via cron
# Pings search engines, submits to IndexNow, tracks results

LOG="/tmp/traffic-driver.log"
DATE=$(date +%Y-%m-%d)

echo "[$DATE] Traffic driver starting..." >> $LOG

# ── 1. IndexNow submission (Bing, Yandex, DuckDuckGo, Seznam) ──
curl -s -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "topstacktools.com",
    "key": "topstacktools2026",
    "keyLocation": "https://topstacktools.com/topstacktools2026.txt",
    "urlList": [
      "https://topstacktools.com",
      "https://topstacktools.com/blog",
      "https://topstacktools.com/blog/best-free-crm-2026",
      "https://topstacktools.com/blog/systeme-io-review-2026",
      "https://topstacktools.com/blog/best-website-builder-small-business",
      "https://topstacktools.com/blog/notion-vs-monday-2026",
      "https://topstacktools.com/blog/best-seo-tools-2026",
      "https://topstacktools.com/reviews/hubspot-crm",
      "https://topstacktools.com/reviews/systeme-io",
      "https://topstacktools.com/reviews/semrush",
      "https://topstacktools.com/comparisons/notion-vs-monday",
      "https://topstacktools.com/comparisons/hubspot-vs-salesforce",
      "https://topstacktools.com/blog/best-email-marketing-tools-small-business-2026",
      "https://topstacktools.com/blog/systeme-io-vs-clickfunnels-2026",
      "https://topstacktools.com/blog/best-project-management-tools-startups-2026",
      "https://topstacktools.com/blog/how-to-build-a-website-for-free-2026",
      "https://topstacktools.com/blog/best-all-in-one-business-platforms-solopreneurs-2026"
    ]
  }' -w "\nIndexNow: %{http_code}" >> $LOG 2>&1

echo "" >> $LOG

# ── 2. Google sitemap ping ──
curl -s "https://www.google.com/ping?sitemap=https://topstacktools.com/sitemap.xml" -o /dev/null -w "Google ping: %{http_code}\n" >> $LOG

# ── 3. Bing sitemap ping ──
curl -s "https://www.bing.com/indexnow?url=https://topstacktools.com/sitemap.xml&key=topstacktools2026" -o /dev/null -w "Bing ping: %{http_code}\n" >> $LOG

# ── 4. Check if site is reachable ──
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://topstacktools.com)
echo "Site status: $STATUS" >> $LOG

if [ "$STATUS" != "200" ]; then
  # Alert via telegram
  curl -s -X POST "https://api.telegram.org/bot7875768666:AAGxLNM1YCdYNV_yMkrwArAoYAfXqFxDCUM/sendMessage" \
    -d "chat_id=508434678" \
    -d "text=⚠️ TopStackTools is DOWN (HTTP $STATUS). Check immediately." > /dev/null 2>&1
fi

# ── 5. Log to dashboard tasks ──
sudo -u postgres psql -d achilles_db -c "
INSERT INTO telemetry (warrior_id, category, action_type, outcome, context, received_at)
VALUES ('achilles', 'traffic', 'daily_ping', 'ok', 'IndexNow + Google + Bing pinged for topstacktools.com — $DATE', NOW())
;" 2>/dev/null

echo "[$DATE] Traffic driver complete" >> $LOG
