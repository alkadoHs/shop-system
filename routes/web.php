<?php

use App\Http\Controllers\BranchSalesController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CreditSalepaymentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeadStockController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSalesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Reports\ExpensesReportController;
use App\Http\Controllers\Reports\LowStockAlertsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\StockMovementController;
use App\Http\Middleware\RemoveCommaFromInput;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('login');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('users', \App\Http\Controllers\UserController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

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

Route::resource('expenses', ExpenseController::class)
    ->only(['index', 'store', 'destroy', 'update'])
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class]);

Route::resource('stock-movements', StockMovementController::class)
    ->only(['index', 'store', 'destroy', 'update'])
    ->middleware(['auth', 'verified']);

Route::get('credit-sales', [\App\Http\Controllers\CreditSalesController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('credit-sales.index');

Route::get('credit-sales/{creditSale}', [\App\Http\Controllers\CreditSalesController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('credit-sales.show');

Route::post('credit-sale-payments/{creditSale}', [CreditSalepaymentController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('credit-sale-payments.store');

Route::get('pending-orders', [\App\Http\Controllers\PendingOrderController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('pending-orders.index');

Route::post('pending-orders/confirm/{order}', [\App\Http\Controllers\PendingOrderController::class, 'confirm'])
    ->middleware(['auth', 'verified'])
    ->name('pending-orders.confirm');

Route::patch('pending-orders/update/{orderItem}', [\App\Http\Controllers\PendingOrderController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('pending-orders.update');

Route::patch('pending-orders/confirm-all/{order}', [\App\Http\Controllers\PendingOrderController::class, 'confirm_all'])
    ->middleware(['auth', 'verified'])
    ->name('pending-orders.confirm-all');


// Reports routes

Route::controller(ReportsController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/sales', 'sales')->name('reports.sales');
    Route::get('/reports/sales/export/excel', 'exportExcel')->name('reports.sales.export.excel');
    Route::get('/reports/sales/export/pdf', 'exportPdf')->name('reports.sales.export.pdf');

    Route::get('reports/expenses', 'expenses')->name('reports.expenses');
    Route::get('reports/stock-movements', 'stockMovements')->name('reports.stock-movements');
});

// sales by branch report
Route::controller(BranchSalesController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/sales-by-branch', 'sales')->name('reports.sales-by-branch');
    Route::get('reports/sales-by-branch/export/excel', 'exportExcel')->name('reports.sales-by-branch.export.excel');
    Route::get('reports/sales-by-branch/export/pdf', 'exportPdf')->name('reports.sales-by-branch.export.pdf');
});

// sales by product report
Route::controller(ProductSalesController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/sales-by-product', 'sales')->name('reports.sales-by-product');
    Route::get('reports/sales-by-product/export/excel', 'exportExcel')->name('reports.sales-by-product.export.excel');
    Route::get('reports/sales-by-product/export/pdf', 'exportPdf')->name('reports.sales-by-product.export.pdf');
});

// dead stock report
Route::controller(DeadStockController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/dead-stock', 'report')->name('reports.dead-stock');
    Route::get('reports/dead-stock/export/excel', 'exportExcel')->name('reports.dead-stock.export.excel');
    Route::get('reports/dead-stock/export/pdf', 'exportPdf')->name('reports.dead-stock.export.pdf');
});

//low stock alert report
Route::controller(LowStockAlertsController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/low-stock-alerts', 'report')->name('reports.low-stock-alerts');
    Route::get('reports/low-stock-alerts/export/excel', 'exportExcel')->name('reports.low-stock-alerts.export.excel');
    Route::get('reports/low-stock-alerts/export/pdf', 'exportPdf')->name('reports.low-stock-alerts.export.pdf');
});

// Expenses report
Route::controller(ExpensesReportController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('reports/expenses', 'report')->name('reports.expenses');
    Route::get('reports/expenses/export/excel', 'exportExcel')->name('reports.expenses.export.excel');
    Route::get('reports/expenses/export/pdf', 'exportPdf')->name('reports.expenses.export.pdf');
});

require __DIR__.'/auth.php';
