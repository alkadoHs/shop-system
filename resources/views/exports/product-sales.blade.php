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
