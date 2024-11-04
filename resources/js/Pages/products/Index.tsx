import ActionButton from "@/components/action-button";
import { Button } from "@/components/ui/button";
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
import { Head } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import CreateProduct from "./actions/create-product";

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

const Products = ({ products }: { products: Product[] }) => {
    return (
        <Authenticated header={<h2>Products</h2>}>
            <Head title="Products" />

            <main className="p-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Products
                </h3>
                <div className="flex justify-between gap-4 mb-4 items-center">
                  <Input type="search" className="max-w-sm" placeholder="Search products..." />
                  <CreateProduct />
                </div>

                <div className="overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>NAME</TableHead>
                                <TableHead className="text-right">
                                    STOCK
                                </TableHead>
                                <TableHead className="text-right">
                                    BUY PRICE
                                </TableHead>
                                <TableHead className="text-right">
                                    SALE PRICE
                                </TableHead>
                                <TableHead className="text-right">
                                    WHOLE PRICE
                                </TableHead>
                                <TableHead className="text-right">
                                    WHOLE STOCK
                                </TableHead>
                                <TableHead className="text-right">
                                    STOCK ALERT
                                </TableHead>
                                <TableHead>EXPIRE DATE</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.stock)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.buy_price)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.sale_price)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.whole_price)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.whole_stock)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {numberFormat(product.stock_alert)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {dateFormat(
                                            product.expire_date
                                                ? product.expire_date
                                                : "DD/MM/YYYY"
                                        )}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <ActionButton variant="update" />
                                        <ActionButton variant="delete" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </Authenticated>
    );
};

export default Products;
