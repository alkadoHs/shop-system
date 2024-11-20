<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RemoveCommaFromInput;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('setup')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('payments', PaymentMethodController::class)->only(['index', 'store', 'destroy']);
});

Route::resource('products', ProductController::class)
    ->only(['index', 'create', 'edit', 'update', 'store', 'destroy'])
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class]);


Route::prefix('pos')->middleware(['auth', 'verified', RemoveCommaFromInput::class])->group(function () {
    Route::get('dashboard', [PosController::class,'index'])->name('pos.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('carts',  [CartController::class, 'index'])->name('carts.index');
    Route::post('carts/{product}',  [CartController::class, 'add'])->name('carts.add');
    Route::patch('carts/{item}',  [CartController::class, 'update'])->name('carts.update');
    Route::delete('carts/{item}',  [CartController::class, 'remove'])->name('carts.remove');
});

Route::resource('customers', CustomerController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('orders', OrderController::class)
    ->only(['index', 'store', 'destroy', 'update'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
