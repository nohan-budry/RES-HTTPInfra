FROM php:7.2-apache

# Uncomment the next line to automatically install vim in the image.
# RUN apt-get update && apt-get install -y vim

COPY setup.sh /var/apache2/
COPY templates/ /var/apache2/
COPY conf/ /etc/apache2/

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*

CMD ["/var/apache2/setup.sh"]