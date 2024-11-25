<!DOCTYPE html>
<html>
<head>
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
    <h1>{{ $title }}</h1>
    <p>Period: {{ $startDate }} to {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>Branch Name</th>
                <th>Total Sales</th>
                <th>Total Profit</th>
                <th># of Transactions</th>
                <th>Avg Sale/Txn</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($salesByBranch as $sale)
            <tr>
                <td>{{ $sale->branch_name }}</td>
                <td>{{ number_format($sale->total_sales, 2) }}</td>
                <td>{{ number_format($sale->total_profit, 2)}}</td>
                <td>{{ $sale->transaction_count }}</td>
                <td>{{ number_format($sale->avg_sales, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
