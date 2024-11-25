import { User } from "@/types";
import { PaginationLink } from "../stock-movements/columns";
import { ColumnDef } from "@tanstack/react-table";
import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Payment } from "../payments/Index";
import { router } from "@inertiajs/react";
import { Product } from "../products/Index";
import { Customer, OrderItem } from "../credit-sales/columns";
import { Check, Eye } from "lucide-react";
import EditPendingOrder from "./actions/edit-pending-order";
import UpdatePendingItem from "./actions/UpdatePendingItem";

export interface Order {
    id: number;
    customer: Customer;
    user: User;
    order_items: OrderItem[];
    status: string;
    order_items_sum_total_p_qty: number;
    order_items_count: number;
    created_at: string;
}

export interface Orders {
    data: Order[];
    links: PaginationLink[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export const pendingOrderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order No.",
        cell: ({ row }) => {
            return <span>{`#${row.original.id}`}</span>;
        },
    },

    {
        accessorKey: "customer.name",
        header: "Customer",
        cell: ({ row }) => {
            const customer = row.original.customer.name;
            return (
                <span className="text-sm font-medium leading-none">
                    {customer ? customer : "-"}
                </span>
            );
        },
    },
    {
        accessorKey: "user.name",
        header: "Seller",
        cell: ({ row }) => {
            return <span>{row.original.user.name}</span>;
        },
    },
    {
        accessorKey: "products_count",
        header: "Items",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.order_items_count)}</span>;
        },
    },
    {
        accessorKey: "order_items_sum_total",
        header: "Total",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.order_items_sum_total_p_qty)}
                </span>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return <span>{dateTimeFormat(row.original.created_at)}</span>;
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Badge
                        variant={"success"}
                        className="cursor-pointer"
                        onClick={() => {
                            if (
                                confirm(
                                    "Are you sure that you want to confirm this order?"
                                )
                            ) {
                                router.post(
                                    route(
                                        "pending-orders.confirm",
                                        row.original.id
                                    )
                                );
                            }
                        }}
                    >
                        <Check className="size-5" />
                    </Badge>
                    <EditPendingOrder orderId={row.original.id} orderItems={row.original.order_items} />
                </div>
            );
        },
    },
];

export const pendingOrderItemColumns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => {
            return <span>{row.original.product.name}</span>;
        },
    },
    {
        accessorKey: "p_qty",
        header: "Qty",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.p_qty)}</span>;
        },
    },
    {
        accessorKey: "qty",
        header: "Sold",
        cell: ({ row }) => {
            return (<UpdatePendingItem item={row.original} />);
        },
    },
    {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => {
            return (
                <span>
                    {Number(row.original.p_qty) - Number(row.original.qty)}
                </span>
            );
        },
    },
];
