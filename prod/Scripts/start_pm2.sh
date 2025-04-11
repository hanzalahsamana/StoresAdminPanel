#!/bin/bash
cd /home/ec2-user/StoresAdminPanel

NODE_OPTIONS="--max-old-space-size=8192" npm run build

pm2 restart hannanfabrics-prod || pm2 start npm --name "hannanfabrics-prod" -- start -- -p 3000

pm2 save
