FROM php:8.2-apache

# instalar mysqli
RUN docker-php-ext-install mysqli

# (boa prática) permitir rewrite
RUN a2enmod rewrite