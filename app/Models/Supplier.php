<?php

namespace App\Models;

use App\Models\Scopes\IndividualCompanyScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy(IndividualCompanyScope::class)]
class Supplier extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'contact',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }
}
