import { dateFormatFilter, numberFormat } from "@/lib/utils";
import { Payment } from "../payments/Index";
import { Product } from "../products/Index";
import { Supplier } from "../suppliers/columns";
import { ColumnDef } from "@tanstack/react-table";
import { branch } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export interface PurchaseOrder {
    id: number;
    supplier_id: number;
    supplier: Supplier;
    branch_id: number;
    branch: branch;
    purchase_order_items_sum_total: number;
    purchase_order_items_sum_qty: number;
    payment_method: Payment;
    purchase_order_items: PurchaseOrderItem[];
    date: string;
    created_at: string;
}

export interface PurchaseOrderItem {
    id: number;
    purchase_order_id: number;
    purchase_order: PurchaseOrder;
    product_id: number;
    product: Product;
    qty: number;
    buy_price: number;
    sale_price: number;
    total: number;
    created_at: string;
}

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
    {
        accessorKey: "date",
        header: "Purchase Date",
    },
    {
        accessorKey: "branch",
        header: "Branch",
        cell: ({ row }) => {
            return <span>{row.original.branch?.name}</span>;
        },
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => {
            return <span>{row.original.supplier?.name}</span>;
        },
    },
    {
        accessorKey: "payment_method",
        header: "Payment Method",
        cell: ({ row }) => {
            return <span>{row.original.payment_method?.name}</span>;
        },
    },
    {
        accessorKey: "purchase_order_items_sum_total",
        header: "Total Price",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.purchase_order_items_sum_total)}
                </span>
            );
        },
    },
    {
        accessorKey: "purchase_order_items_sum_qty",
        header: "Total Items",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.purchase_order_items_sum_qty)}
                </span>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button variant={"outline"} asChild>
                        <Link href={route("purchases.show", row.original.id)}>
                            View
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];

export const purchaseOrderItemColumns: ColumnDef<PurchaseOrderItem>[] = [
    {
        accessorKey: "#",
        header: "S/N",
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
            return <span>{row.original.product?.name}</span>;
        },
    },
    {
        accessorKey: "qty",
        header: "Qty",
        cell: ({ row }) => {
            return <span>{row.original.qty}</span>;
        },
    },
    {
        accessorKey: "buy_price",
        header: "Buy Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.buy_price)}</span>;
        },
    },
    {
        accessorKey: "sale_price",
        header: "Sale Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.sale_price)}</span>;
        },
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total)}</span>;
        },
    },
];
