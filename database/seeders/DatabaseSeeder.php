<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Company;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $company = Company::create([
            'name' => 'MAUZODATA SALES INNOVATION',
            'email' => 'admin@mauzodata.com',
            'phone' => '07123456789',
            'address' => '123 Main St',
        ]);

        $branch = Branch::create([
            'name'=> 'Main Branch',
            'company_id' => $company->id,
        ]);

        User::create([
            'name' => 'alkado',
            'email' => 'admin@mauzodata.com',
            'phone' => '07123456789',
            'email_verified_at' => now(),
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
            'remember_token' => \Illuminate\Support\Str::random(10),
            'company_id' => $company->id,
            'branch_id' => $branch->id,
        ]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
