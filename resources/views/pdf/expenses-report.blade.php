<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expenses Report</title>
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
    <h1>Expenses Report</h1>
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
</body>
</html>
