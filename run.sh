#! /bin/bash

live-server --no-browser --quiet &
chromium-browser --disable-web-security --kiosk 127.0.0.1:8080 &
python3 listener.py &
