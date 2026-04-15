#!/bin/bash
# TopStackTools Backlink Submitter — submits site to free web directories
LOG="/tmp/backlink-submitter.log"
DATE=$(date +%Y-%m-%d)

echo "[$DATE] Backlink submitter starting..." >> $LOG

# Ping search engines with individual article URLs
URLS=(
  "https://topstacktools.com"
  "https://topstacktools.com/blog"
  "https://topstacktools.com/blog/best-free-crm-2026"
  "https://topstacktools.com/blog/systeme-io-review-2026"
  "https://topstacktools.com/blog/best-website-builder-small-business"
  "https://topstacktools.com/blog/notion-vs-monday-2026"
  "https://topstacktools.com/blog/best-seo-tools-2026"
  "https://topstacktools.com/blog/best-email-marketing-tools-small-business-2026"
  "https://topstacktools.com/blog/systeme-io-vs-clickfunnels-2026"
  "https://topstacktools.com/blog/best-project-management-tools-startups-2026"
  "https://topstacktools.com/blog/how-to-build-a-website-for-free-2026"
  "https://topstacktools.com/blog/best-all-in-one-business-platforms-solopreneurs-2026"
)

# Submit each URL individually to IndexNow
for URL in "${URLS[@]}"; do
  curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=topstacktools2026" -o /dev/null -w "IndexNow $URL: %{http_code}\n" >> $LOG
done

# Ping Yandex
curl -s "https://webmaster.yandex.com/ping?sitemap=https://topstacktools.com/sitemap.xml" -o /dev/null -w "Yandex ping: %{http_code}\n" >> $LOG

# Ping Bing
curl -s "https://www.bing.com/indexnow?url=https://topstacktools.com/sitemap.xml&key=topstacktools2026" -o /dev/null -w "Bing ping: %{http_code}\n" >> $LOG

echo "[$DATE] Backlink submitter complete" >> $LOG
