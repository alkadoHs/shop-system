<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        "name",
        "buy_price",
        "sale_price",
        "whole_price",
        "stock",
        "whole_stock",
        "stock_alert",
        "expire_date",
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
