<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'qty',
        'p_qty',
        'buy_price',
        'price',
        'company',
        'imei',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('scopeBranchSales', function (Builder $builder) {
            $builder->whereRelation('order', 'branch_id', auth()->user()->branch_id);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
