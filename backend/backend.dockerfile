FROM php:7.4-fpm

RUN apt-get update
RUN apt-get install -y libmcrypt-dev mariadb-client
RUN docker-php-ext-install pdo_mysql
