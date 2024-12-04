import { dateFormatFilter, numberFormat } from "@/lib/utils";
import { Payment } from "../payments/Index";
import { Product } from "../products/Index";
import { Supplier } from "../suppliers/columns";
import { ColumnDef } from "@tanstack/react-table";
import { branch } from "@/types";

export interface PurchaseOrder {
    id: number;
    supplier_id: number;
    supplier: Supplier;
    branch_id: number;
    branch: branch;
    purchase_order_items_sum_total: number;
    purchase_order_items_sum_qty: number;
    payment_method: Payment;
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
        accessorKey: "#",
        header: "S/N",
        cell: ({ row }) => {
            return (
                <span>{row.index + 1}</span>
            );
        },
    },
    {
        accessorKey: "branch",
        header: "Branch",
        cell: ({ row }) => {
            return (
                <span>{row.original.branch?.name}</span>
            );
        }
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => {
            return (
                <span>{row.original.supplier?.name}</span>
            );
        },
    },
    {
        accessorKey: "payment_method",
        header: "Payment Method",
        cell: ({ row }) => {
            return (
                <span>{row.original.payment_method?.name}</span>
            );
        }
    },
    {
        accessorKey: "purchase_order_items_sum_total",
        header: "Total Price",
        cell: ({ row }) => {
            return (
                <span>{numberFormat(row.original.purchase_order_items_sum_total)}</span>
            );
        }
    },
    {
        accessorKey: "purchase_order_items_sum_qty",
        header: "Total Items",
        cell: ({ row }) => {
            return (
                <span>{numberFormat(row.original.purchase_order_items_sum_qty)}</span>
            );
        }
    },
    {
        accessorKey: "date",
        header: "Purchase Date",
    },
];