#!/bin/bash
# TopStackTools Traffic Driver — runs daily via cron
# Dynamically builds URL list from articles.json
LOG="/tmp/traffic-driver.log"
DATE=$(date +%Y-%m-%d)
ARTICLES_JSON="/home/ubuntu/topstacktools/src/data/articles.json"

echo "[$DATE] Traffic driver starting..." >> $LOG

# ── 1. Build dynamic URL list and submit to IndexNow ──
URL_LIST=$(python3 -c "
import json
urls = [
    'https://topstacktools.com',
    'https://topstacktools.com/blog',
    'https://topstacktools.com/reviews/hubspot-crm',
    'https://topstacktools.com/reviews/systeme-io',
    'https://topstacktools.com/reviews/semrush',
    'https://topstacktools.com/comparisons/notion-vs-monday',
    'https://topstacktools.com/comparisons/hubspot-vs-salesforce',
]
with open('$ARTICLES_JSON') as f:
    articles = json.load(f)
for a in articles:
    urls.append(f\"https://topstacktools.com/blog/{a['slug']}\")
print(','.join(['\"' + u + '\"' for u in urls]))
")

curl -s -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"topstacktools.com\",
    \"key\": \"topstacktools2026\",
    \"keyLocation\": \"https://topstacktools.com/topstacktools2026.txt\",
    \"urlList\": [${URL_LIST}]
  }" -w "\nIndexNow: %{http_code}" >> $LOG 2>&1

echo "" >> $LOG

# ── 2. Bing sitemap ping ──
curl -s "https://www.bing.com/indexnow?url=https://topstacktools.com/sitemap.xml&key=topstacktools2026" -o /dev/null -w "Bing ping: %{http_code}\n" >> $LOG

# ── 3. Yandex sitemap ping ──
curl -s "https://webmaster.yandex.com/ping?sitemap=https://topstacktools.com/sitemap.xml" -o /dev/null -w "Yandex ping: %{http_code}\n" >> $LOG

# ── 4. Check if site is reachable ──
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://topstacktools.com)
echo "Site status: $STATUS" >> $LOG

if [ "$STATUS" != "200" ]; then
  curl -s -X POST "https://api.telegram.org/bot7875768666:AAGxLNM1YCdYNV_yMkrwArAoYAfXqFxDCUM/sendMessage" \
    -d "chat_id=508434678" \
    -d "text=⚠️ TopStackTools is DOWN (HTTP $STATUS). Check immediately." > /dev/null 2>&1
fi

# ── 5. Log to dashboard ──
ARTICLE_COUNT=$(python3 -c "import json; print(len(json.load(open('$ARTICLES_JSON'))))")
sudo -u postgres psql -d achilles_db -c "
INSERT INTO telemetry (warrior_id, category, action_type, outcome, context, received_at)
VALUES ('achilles', 'traffic', 'daily_ping', 'ok', 'IndexNow + Bing + Yandex pinged — ${ARTICLE_COUNT} articles — $DATE', NOW())
;" 2>/dev/null

echo "[$DATE] Traffic driver complete — $ARTICLE_COUNT articles submitted" >> $LOG
