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
