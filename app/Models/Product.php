<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
