#!/bin/bash

# Define the file paths to check
FILE_PATH_APP="/usr/share/nginx/app/favicon.ico"

# Loop until both files are found
while [ ! -f "$FILE_PATH_APP" ];
do
  echo "Waiting for file to be available..."
  sleep 5 # wait for 5 seconds before checking again
done

echo "File found, starting nginx..."
# Start nginx in the foreground to keep the container running
nginx -g 'daemon off;'
