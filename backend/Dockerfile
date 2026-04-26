FROM php:8.2-apache

# instalar mysqli
RUN docker-php-ext-install mysqli

# (boa prática) permitir rewrite
RUN a2enmod rewrite

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf