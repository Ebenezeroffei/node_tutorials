#!/bin/bash

npm install
pm2 restart app
sudo systemctl restart nginx