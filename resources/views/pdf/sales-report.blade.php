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
            background-color: #3f51b5;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tfoot td {
            font-weight: bold;
            background-color: #f4f4f4;
            color: #555;
            text-align: right;
        }

        /* Column-specific width adjustments for better layout in PDFs */
        td:nth-child(1) {
            width: 20%; /* Date column */
            text-align: center;
        }

        td:nth-child(2), td:nth-child(3), td:nth-child(5) {
            text-align: right; /* Align numerical data */
        }
    </style>
</head>
<body>
    <h1>{{ $title }}</h1>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Total Sales</th>
                <th>Total Profit</th>
                <th># of Transactions</th>
                <th>Avg Sale/Txn</th>
            </tr>
        </thead>
        <tbody>
            @php
                $totalSales = 0;
                $totalProfit = 0;
                $totalTransactions = 0;
            @endphp
            @foreach ($data as $sale)
                @php
                    $totalSales += $sale->total_sales;
                    $totalProfit += $sale->total_profit;
                    $totalTransactions += $sale->transaction_count;
                @endphp
                <tr>
                    <td>{{ date('d-m-Y', strtotime($sale->date)) }}</td>
                    <td>{{ number_format($sale->total_sales, 2) }}</td>
                    <td>{{ number_format($sale->total_profit, 2) }}</td>
                    <td>{{ $sale->transaction_count }}</td>
                    <td>{{ number_format($sale->avg_sales, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td>Total</td>
                <td>{{ number_format($totalSales, 2) }}</td>
                <td>{{ number_format($totalProfit, 2) }}</td>
                <td>{{ $totalTransactions }}</td>
                <td>{{ $totalTransactions > 0 ? number_format($totalSales / $totalTransactions, 2) : 0 }}</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
