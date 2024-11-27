# Use PHP 8.3 official image with FPM
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/mauzodata

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application code
COPY . /var/www/mauzodata

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/mauzodata \
    && chmod -R 755 /var/www/mauzodata/storage /var/www/mauzodata/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
