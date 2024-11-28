<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseItem extends Model
{
    protected $fillable = [
        'expense_id',
        'item',
        'cost',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('scopeBranch', function (Builder $builder) {
            $builder->whereRelation('expense', 'branch_id', auth()->user()->branch_id);
        });
    }


    public function expense(): BelongsTo
    {
        return $this->belongsTo(Expense::class);
    }
}
