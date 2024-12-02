<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'logo',
    ];  

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    public function productCompanies(): HasMany
    {
        return $this->hasMany(ProductCompany::class);
    }
}
