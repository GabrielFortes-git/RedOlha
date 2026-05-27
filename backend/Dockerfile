FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev

# instalar mysqli
RUN docker-php-ext-install mysqli

# (boa prática) permitir rewrite
RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf