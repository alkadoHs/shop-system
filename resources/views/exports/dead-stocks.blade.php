<table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Last Sale Date</th>
                <th>Quantity Sold (30d)</th>
                <th>Days Since Last Sale</th>
                <th>Stock Value</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($deadStocks as $stock)
                <tr>
                    <td>{{ $stock->product_name }}</td>
                    <td>{{ $stock->last_sale_date ? date('d-m-Y', strtotime($stock->last_sale_date)) : 'Never' }}</td>
                    <td>{{ $stock->quantity_sold ?? 0 }}</td>
                    <td>{{ $stock->days_since_last_sale ?? "-" }}</td>
                    <td>{{ number_format($stock->stock_value, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>