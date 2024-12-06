<?php

namespace App\Models;

use App\Models\Scopes\IndividualCompanyScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

#[ScopedBy(IndividualCompanyScope::class)]
class PaymentMethod extends Model
{
    protected $fillable = [
        'company_id', "name", "number"
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function orderItems(): HasManyThrough
    {
        return $this->hasManyThrough(OrderItem::class, Order::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function expenseItems(): HasManyThrough
    {
        return $this->hasManyThrough(ExpenseItem::class, Expense::class);
    }

    public function creditSalePayments(): HasMany
    {
        return $this->hasMany(CreditSalepayment::class);
    }

    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    public function purchaseOrderItems(): HasManyThrough
    {
        return $this->hasManyThrough(PurchaseOrderItem::class, PurchaseOrder::class);
    }
}
