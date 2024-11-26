<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dead Stock Report</title>
    <style>
        body { font-family: 'Arial', sans-serif; font-size: 12px; }
        h1 { text-align: center; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px; border: 1px solid #ccc; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>Dead Stock Report</h1>
    <p>From: {{ $startDate }} - To: {{ $endDate }}</p>
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
    <div class="footer">
        <p>Generated on {{ now()->format('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>
