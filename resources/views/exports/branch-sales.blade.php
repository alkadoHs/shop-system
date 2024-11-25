<table>
    <thead>
        <tr>
            <th>Branch Name</th>
            <th>Total Sales</th>
            <th># of Transactions</th>
            <th>Avg Sale/Txn</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($salesByBranch as $sale)
        <tr>
            <td>{{ $sale->branch_name }}</td>
            <td>{{ number_format($sale->total_sales, 2) }}</td>
            <td>{{ $sale->transaction_count }}</td>
            <td>{{ number_format($sale->avg_sales, 2) }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
