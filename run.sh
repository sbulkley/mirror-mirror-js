#! /bin/bash

live-server --no-browser --quiet &
chromium-browser --disable-web-security 127.0.0.1:8080 &
