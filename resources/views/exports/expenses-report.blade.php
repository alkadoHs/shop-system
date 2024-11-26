<table>
    <thead>
        <tr>
            <th>User</th>
            <th>Payment Method</th>
            <th>Items</th>
            <th>Total Cost</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($expenses as $expense)
            <tr>
                <td>{{ $expense['user'] }}</td>
                <td>{{ $expense['payment_method'] }}</td>
                <td>{{ $expense['items'] }}</td>
                <td>{{ number_format($expense['total_cost'], 2) }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
