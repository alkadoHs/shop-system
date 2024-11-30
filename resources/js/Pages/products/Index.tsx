import ActionButton from "@/components/action-button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { dateFormat, numberFormat } from "@/lib/utils";
import { Deferred, Head, router } from "@inertiajs/react";
import CreateProduct from "./actions/create-product";
import DeleteProduct from "./actions/delete-product";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaginationLink } from "../stock-movements/columns";
import { Spinner } from "@/components/ui/spinner";

export interface Product {
    id: number;
    name: string;
    buy_price: number;
    sale_price: number;
    whole_price: number;
    whole_stock: number;
    stock: number;
    stock_alert: number;
    expire_date: string;
}

export interface Products {
    data: Product[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

const Products = ({ products }: { products: Product[] }) => {
    const onSearchChange = useDebouncedCallback(
        (value?: ChangeEvent<HTMLInputElement>) => {
            if (value && value?.target.value) {
                router.visit(route("products.index"), {
                    data: { search: value.target.value },
                    only: ["products"],
                    preserveScroll: true,
                    preserveState: true,
                });
            } else {
                router.visit(route("products.index"));
            }
        },
        1000
    );
    return (
        <Authenticated header={<h2>Products</h2>}>
            <Head title="Products" />

            <Card className="max-w-full p-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
                    Products
                </h3>

                <Separator />

                <div className="flex justify-between gap-4 my-2 items-center">
                    <Input
                        type="search"
                        className="max-w-sm"
                        onChange={onSearchChange}
                        placeholder="Search products..."
                    />
                    <CreateProduct />
                </div>

                <div className="w-full overflow-x-auto whitespace-nowrap border bg-card">
                    <Deferred data="products" fallback={<Spinner />}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">S/N</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">
                                        Stock
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Buy price
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Selling price
                                    </TableHead>
                                    {/* <TableHead className="text-right">
                                        Whole price
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Whole stock
                                    </TableHead> */}
                                    <TableHead className="text-right">
                                        Stock alert
                                    </TableHead>
                                    {/* <TableHead>Expire date</TableHead> */}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products?.map((product, index) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="pl-6">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell className="text-right">
                                            {Number(product.stock) <=
                                            Number(product.stock_alert) ? (
                                                <Badge variant="destructive">
                                                    {numberFormat(
                                                        product.stock
                                                    )}
                                                </Badge>
                                            ) : (
                                                <Badge>
                                                    {numberFormat(
                                                        product.stock
                                                    )}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberFormat(product.buy_price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberFormat(product.sale_price)}
                                        </TableCell>
                                        {/* <TableCell className="text-right">
                                            {numberFormat(product.whole_price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {numberFormat(product.whole_stock)}
                                        </TableCell> */}
                                        <TableCell className="text-right">
                                            {numberFormat(product.stock_alert)}
                                        </TableCell>
                                        {/* <TableCell className="text-right">
                                            {product.expire_date
                                                ? dateFormat(
                                                      product.expire_date
                                                  )
                                                : "DD/MM/YYYY"}
                                        </TableCell> */}
                                        <TableCell className="flex items-center gap-2 pr-6">
                                            <ActionButton
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "products.edit",
                                                            product.id
                                                        )
                                                    )
                                                }
                                                variant="update"
                                            />
                                            <DeleteProduct product={product} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Deferred>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Products;
