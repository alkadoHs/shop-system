<table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Transaction Count</th>
            <th>Total Sales</th>
            <th>Total Profit</th>
            <th>Average Sales</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($sales as $sale)
        <tr>
            <td>{{ $sale->date }}</td>
            <td>{{ $sale->transaction_count }}</td>
            <td>{{ $sale->total_sales }}</td>
            <td>{{ $sale->total_profit }}</td>
            <td>{{ $sale->avg_sales }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
