<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Low Stock Alerts</title>
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
    </style>
</head>
<body>
    <h1>Low Stock Alerts</h1>
    <table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Buy Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($lowStockProducts as $product)
                <tr>
                    <td>{{ $product->product_name }}</td>
                    <td>{{ $product->stock }}</td>
                    <td>{{ number_format($product->buy_price, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
