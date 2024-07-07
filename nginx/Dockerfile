FROM nginx:latest

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make sure the script is executable
RUN chmod +x /entrypoint.sh

# Set the script as the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

COPY nginx.conf /etc/nginx/nginx.conf