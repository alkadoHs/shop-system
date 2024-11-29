<?php

namespace App\Models;

use App\Observers\CustomerObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy(CustomerObserver::class)]
class Customer extends Model
{
    protected $fillable = ['branch_id','name', 'contact', 'location'];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
