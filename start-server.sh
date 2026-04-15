#!/bin/bash
# Start TopStackTools if not already running
if ! pgrep -f "next start -p 3001" > /dev/null; then
    cd /home/ubuntu/topstacktools
    nohup npx next start -p 3001 > /tmp/topstacktools.log 2>&1 &
    echo "$(date -u) TopStackTools started on port 3001" >> /tmp/topstacktools-starts.log
fi
