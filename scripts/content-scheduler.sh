#!/usr/bin/env bash
#
# TopStackTools Content Scheduler
# Picks the next unwritten SEO topic and generates an article.
# Tracks completed topics to avoid repeats.
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="/home/ubuntu/topstacktools"
LOG_FILE="${SCRIPT_DIR}/content-log.txt"
TRACKER_FILE="${SCRIPT_DIR}/topics-completed.txt"
GENERATOR="${SCRIPT_DIR}/generate-article.py"

# Create tracker/log files if they don't exist
touch "$LOG_FILE"
touch "$TRACKER_FILE"

# 20 SEO keyword topics to cycle through
TOPICS=(
  "best project management tools 2026"
  "HubSpot alternatives for small business"
  "is Jasper AI worth it in 2026"
  "best AI writing tools for content marketers"
  "Semrush vs Ahrefs which is better 2026"
  "cheapest web hosting for small business 2026"
  "best tools for solopreneurs 2026"
  "best free email marketing tools 2026"
  "Systeme.io vs ClickFunnels which saves more money"
  "best CRM for real estate agents 2026"
  "best Notion templates for small business"
  "how to build a sales funnel for free"
  "best SEO tools for beginners 2026"
  "Hostinger vs Bluehost honest comparison"
  "best all in one marketing platform 2026"
  "best tools to automate your online business"
  "best website builders for freelancers 2026"
  "how to choose the right CRM for your business"
  "best AI tools for small business owners 2026"
  "Notion vs ClickUp for project management 2026"
)

# Find the next unwritten topic
SELECTED_TOPIC=""
for topic in "${TOPICS[@]}"; do
  if ! grep -qxF "$topic" "$TRACKER_FILE" 2>/dev/null; then
    SELECTED_TOPIC="$topic"
    break
  fi
done

if [ -z "$SELECTED_TOPIC" ]; then
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') — All 20 topics have been written. No new article generated." >> "$LOG_FILE"
  echo "All topics completed."
  exit 0
fi

echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') — Starting article generation for: \"$SELECTED_TOPIC\"" >> "$LOG_FILE"

# Run the generator
if python3 "$GENERATOR" "$SELECTED_TOPIC" >> "$LOG_FILE" 2>&1; then
  # Mark topic as completed
  echo "$SELECTED_TOPIC" >> "$TRACKER_FILE"
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') — SUCCESS: Article generated for \"$SELECTED_TOPIC\"" >> "$LOG_FILE"
  echo "Article generated successfully for: \"$SELECTED_TOPIC\""
else
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') — FAILED: Article generation failed for \"$SELECTED_TOPIC\"" >> "$LOG_FILE"
  echo "Article generation failed for: \"$SELECTED_TOPIC\""
  exit 1
fi

echo "---" >> "$LOG_FILE"
