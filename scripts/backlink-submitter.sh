#!/bin/bash
# TopStackTools Backlink Submitter — submits all articles to IndexNow
LOG="/tmp/backlink-submitter.log"
DATE=$(date +%Y-%m-%d)
ARTICLES_JSON="/home/ubuntu/topstacktools/src/data/articles.json"

echo "[$DATE] Backlink submitter starting..." >> $LOG

# Static URLs
STATIC_URLS=(
  "https://topstacktools.com"
  "https://topstacktools.com/blog"
  "https://topstacktools.com/reviews/hubspot-crm"
  "https://topstacktools.com/reviews/systeme-io"
  "https://topstacktools.com/reviews/semrush"
  "https://topstacktools.com/comparisons/notion-vs-monday"
  "https://topstacktools.com/comparisons/hubspot-vs-salesforce"
)

# Submit static URLs
for URL in "${STATIC_URLS[@]}"; do
  curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=topstacktools2026" -o /dev/null -w "IndexNow $URL: %{http_code}\n" >> $LOG
done

# Dynamically extract all article slugs from articles.json and submit
python3 -c "
import json
with open('$ARTICLES_JSON') as f:
    articles = json.load(f)
for a in articles:
    print(a['slug'])
" | while read SLUG; do
  URL="https://topstacktools.com/blog/${SLUG}"
  curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=topstacktools2026" -o /dev/null -w "IndexNow $URL: %{http_code}\n" >> $LOG
done

# Ping Yandex
curl -s "https://webmaster.yandex.com/ping?sitemap=https://topstacktools.com/sitemap.xml" -o /dev/null -w "Yandex ping: %{http_code}\n" >> $LOG

# Ping Bing
curl -s "https://www.bing.com/indexnow?url=https://topstacktools.com/sitemap.xml&key=topstacktools2026" -o /dev/null -w "Bing ping: %{http_code}\n" >> $LOG

echo "[$DATE] Backlink submitter complete" >> $LOG
