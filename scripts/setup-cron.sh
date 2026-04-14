#!/usr/bin/env bash
#
# TopStackTools Cron Setup
# Installs crontab entries for automated article generation.
# Runs content-scheduler.sh at 8:00 AM UTC and 4:00 PM UTC daily.
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCHEDULER="${SCRIPT_DIR}/content-scheduler.sh"
CRON_LOG="/home/ubuntu/topstacktools/scripts/cron-output.log"

# Ensure scripts are executable
chmod +x "$SCHEDULER"
chmod +x "${SCRIPT_DIR}/generate-article.py"

# Define the cron entries
CRON_MORNING="0 8 * * * ${SCHEDULER} >> ${CRON_LOG} 2>&1"
CRON_AFTERNOON="0 16 * * * ${SCHEDULER} >> ${CRON_LOG} 2>&1"
CRON_MARKER="# TopStackTools content scheduler"

# Get current crontab (ignore error if no crontab exists)
CURRENT_CRON=$(crontab -l 2>/dev/null || true)

# Check if already installed
if echo "$CURRENT_CRON" | grep -qF "content-scheduler.sh"; then
  echo "TopStackTools cron jobs already installed. Current entries:"
  echo "$CURRENT_CRON" | grep "content-scheduler"
  echo ""
  read -p "Replace existing entries? (y/N): " CONFIRM
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "No changes made."
    exit 0
  fi
  # Remove existing entries
  CURRENT_CRON=$(echo "$CURRENT_CRON" | grep -v "content-scheduler.sh" | grep -v "TopStackTools content scheduler" || true)
fi

# Add the new cron entries
NEW_CRON="${CURRENT_CRON}
${CRON_MARKER}
${CRON_MORNING}
${CRON_AFTERNOON}"

# Remove any leading/trailing blank lines
NEW_CRON=$(echo "$NEW_CRON" | sed '/^$/N;/^\n$/d')

# Install the new crontab
echo "$NEW_CRON" | crontab -

echo "Cron jobs installed successfully!"
echo ""
echo "Schedule:"
echo "  8:00 AM UTC  — ${SCHEDULER}"
echo "  4:00 PM UTC  — ${SCHEDULER}"
echo ""
echo "Logs: ${CRON_LOG}"
echo ""
echo "Verify with: crontab -l"
