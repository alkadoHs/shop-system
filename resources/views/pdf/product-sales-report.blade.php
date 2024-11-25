<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales by Product Report</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
        }

        h1 {
            text-align: center;
            color: #4a4a4a;
            margin-bottom: 20px;
            text-transform: uppercase;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 8px 10px;
            border: 1px solid #dddddd;
            text-align: left;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .header h1 {
            margin: 0;
            font-size: 18px;
        }

        .header p {
            margin: 5px 0;
            font-size: 14px;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Sales by Product Report</h1>
        <p>From: {{ $startDate }} - To: {{ $endDate }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
                <th>Total Revenue</th>
                <th>Average Sale Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($salesByProduct as $product)
                <tr>
                    <td>{{ $product->product_name }}</td>
                    <td>{{ $product->quantity_sold }}</td>
                    <td>{{ number_format($product->total_revenue, 2) }}</td>
                    <td>{{ number_format($product->avg_sale_price, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Generated on {{ now()->format('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>
