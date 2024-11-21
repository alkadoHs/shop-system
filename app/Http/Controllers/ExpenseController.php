<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use App\Models\ExpenseItem;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Response;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $expenses = ExpenseItem::with('expense.paymentMethod')->whereRelation('expense', 'user_id', auth()->user()->id)->whereDate('created_at', today())->get();
        $payments = PaymentMethod::get();
        $total = ExpenseItem::whereRelation('expense', 'user_id', auth()->user()->id)->whereDate('created_at', today())->sum('cost');
        
        return inertia('expenses/Index', [
            'expenses' => $expenses,
            'payments' => $payments,
            'total' => $total,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();

        // check if a user has expense today
        $expense = Expense::where([['user_id', auth()->user()->id], ['payment_method_id', $validated['payment_method_id']]])->whereDate('created_at', today())->first();

        // if user has expense today, add the expense items to today's expense else create a new expense and add the expense items to it
        if ($expense) {
            $expense->expenseItems()->create([
                'item' => $validated['item'],
                'cost' => $validated['cost'],
            ]);
        } else {
            $expense = Expense::create([
                'payment_method_id' => $validated['payment_method_id'],
            ]);

            $expense->expenseItems()->create([
                'item' => $validated['item'],
                'cost' => $validated['cost'],
            ]);
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        //
    }
}
