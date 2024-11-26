<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Observers\ProductObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy(BranchScope::class)]
#[ObservedBy(ProductObserver::class)]
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

    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }
}
