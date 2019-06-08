#!/bin/bash
set -e

echo "Setup reverse proxy ..."
echo "Static app: $STATIC_APP"
echo "Dynamic app: $DYNAMIC_APP"

php /var/apache2/reverse-proxy.conf.php > /etc/apache2/sites-available/001-reverse-proxy.conf
cat /etc/apache2/sites-available/001-reverse-proxy.conf

apache2-foreground