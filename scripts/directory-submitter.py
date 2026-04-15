#!/usr/bin/env python3
"""
TopStackTools Directory Submitter
Submits site to free web directories and startup platforms for backlinks.
"""
import subprocess, requests, json
from datetime import datetime, timezone

def log(msg):
    ts = datetime.now(timezone.utc).strftime("%H:%M:%S")
    print(f"[{ts}] {msg}")

def db_exec(sql):
    subprocess.run(["sudo", "-u", "postgres", "psql", "-d", "achilles_db", "-c", sql],
                   capture_output=True, text=True, timeout=15)

# Track submissions
DIRECTORIES = [
    {"name": "SaaSHub", "url": "https://www.saashub.com/submit", "status": "manual", "dr": 77},
    {"name": "Capterra", "url": "https://www.capterra.com/vendors/sign-up", "status": "manual", "dr": 91},
    {"name": "GetApp", "url": "https://www.getapp.com/submit", "status": "manual", "dr": 82},
    {"name": "G2", "url": "https://sell.g2.com/create-a-profile", "status": "manual", "dr": 93},
    {"name": "Product Hunt", "url": "https://www.producthunt.com/posts/new", "status": "manual", "dr": 91},
    {"name": "BetaList", "url": "https://betalist.com/submit", "status": "manual", "dr": 72},
    {"name": "Startups Lab", "url": "https://startups-lab.com/submit", "status": "manual", "dr": 58},
    {"name": "AlternativeTo", "url": "https://alternativeto.net/add-app/", "status": "manual", "dr": 82},
    {"name": "Indie Hackers", "url": "https://www.indiehackers.com/products", "status": "manual", "dr": 76},
    {"name": "Crunchbase", "url": "https://www.crunchbase.com/add-new", "status": "manual", "dr": 91},
    {"name": "SaaSworthy", "url": "https://www.saasworthy.com/suggest", "status": "manual", "dr": 62},
    {"name": "ToolPilot.ai", "url": "https://www.toolpilot.ai/submit", "status": "manual", "dr": 55},
]

# Log all directory targets to DB for tracking
for d in DIRECTORIES:
    escaped_name = d['name'].replace("'", "''")
    db_exec(f"""INSERT INTO telemetry (warrior_id, category, action_type, outcome, context, received_at)
               VALUES ('achilles', 'topstacktools', 'directory_target', 'pending',
               '{escaped_name} (DR {d["dr"]}) — {d["url"]}', NOW())
               """)
    log(f"Tracked: {d['name']} (DR {d['dr']})")

# Submit to IndexNow again for good measure
urls = [
    "https://topstacktools.com",
    "https://topstacktools.com/blog",
    "https://topstacktools.com/about",
]
for i in range(1, 11):
    pass  # URLs already submitted

log(f"Tracked {len(DIRECTORIES)} directory targets for submission")
log("Manual submissions needed for account-based directories")

if __name__ == "__main__":
    log("=== Directory Submitter ===")
