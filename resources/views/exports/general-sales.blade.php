<table>
    <thead>
        <tr>
            <th>Order No</th>
            <th>STATUS</th>
            <th>CUSTOMER</th>
            <th>PRODUCT</th>
            <th>IMEI</th>
            <th>COMPANY</th>
            <th>QTY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>DATE</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($generalSales as $sale)
        <tr>
            <td>#{{ $sale->order->id }}</td>
            <td>{{ $sale->order?->status }}</td>
            <td>{{ $sale->order?->customer?->name ?? "-"}}</td>
            <td>{{ $sale->product?->name }}</td>
            <td>
                <div>
                    <p>IMEI1: {{ $sale->imei }}</p>
                    <p>IMEI1: {{ $sale->imei2 }}</p>
                </div>
            </td>
            <td>{{ $sale->company }}</td>
            <td>{{ number_format($sale->qty)}}</td>
            <td>{{ number_format($sale->price) }}</td>
            <td>{{ number_format($sale->total )}}</td>
            <td>{{ date('d/m/Y', strtotime($sale->created_at))}}</td>
        </tr>
        @endforeach
    </tbody>
</table>
