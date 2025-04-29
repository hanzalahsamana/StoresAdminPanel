#!/bin/bash
cd /home/ubuntu/demo

NODE_OPTIONS="--max-old-space-size=8192" npm run build

pm2 restart hannanfabrics-dev || pm2 start npm --name "hannanfabrics-dev" -- start -- -p 3001

pm2 save
