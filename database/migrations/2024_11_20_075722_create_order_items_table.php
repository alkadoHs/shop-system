<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->restrictOnDelete();
            $table->decimal('qty');
            $table->decimal('buy_price', 10, 2);
            $table->decimal('price', 10, 2);
            $table->decimal('total', 10, 2)->virtualAs('qty * price');
            $table->decimal('total_buy_price', 10, 2)->virtualAs('qty * buy_price');
            $table->decimal('profit', 10, 2)->virtualAs('total - total_buy_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
