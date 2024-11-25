import { User } from "@/types";
import { PaginationLink } from "../stock-movements/columns";
import { ColumnDef } from "@tanstack/react-table";
import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Payment } from "../payments/Index";
import { router } from "@inertiajs/react";
import { Product } from "../products/Index";

export interface Customer {
    id: number;
    name: string;
    contact: string;
}

export interface CreditSale {
    id: number;
    customer: Customer;
    user: User;
    status: string;
    order_items_sum_total: number;
    credit_salepayments_sum_amount: number;
    created_at: string;
}

export interface CreditSales {
    data: CreditSale[];
    links: PaginationLink[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface CreditSalePayment {
    id: number;
    order: CreditSale;
    payment_method: Payment;
    user: User;
    amount: number;
    created_at: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    price: number;
    qty: number;
    p_qty: number;
    total: number;
    profit: number;
    total_buy_price: number;
    created_at: number;
}

export const creditSaleColumns: ColumnDef<CreditSale>[] = [
    {
        accessorKey: "id",
        header: "Order No.",
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
        cell: ({ row }) => {
            return (
                <span className="text-sm font-medium leading-none">
                    {row.original.customer.name}
                </span>
            );
        },
    },
    {
        accessorKey: "user.name",
        header: "User",
        cell: ({ row }) => {
            return <span>{row.original.user.name}</span>;
        },
    },
    {
        accessorKey: "order_items_sum_total",
        header: "Total",
        cell: ({ row }) => {
            return (
                <span>{numberFormat(row.original.order_items_sum_total)}</span>
            );
        },
    },
    {
        accessorKey: "credit_sale_payments_sum_amount",
        header: "Paid",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.credit_salepayments_sum_amount)}
                </span>
            );
        },
    },
    {
        accessorKey: "debt",
        header: "Bebt",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(
                        row.original.order_items_sum_total -
                            row.original.credit_salepayments_sum_amount
                    )}
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
                <Badge
                    variant={"success"}
                    className="cursor-pointer"
                    onClick={() => router.visit(route("credit-sales.show", row.original.id))}
                >
                    Pay
                </Badge>
            );
        },
    },
];

export const creditSalePaymentColumns: ColumnDef<CreditSalePayment>[] = [
    {
        accessorKey: "payment_method.name",
        header: "Account",
        cell: ({ row }) => {
            return (
                <span className="text-sm font-medium leading-none">
                    {row.original.payment_method.name}
                </span>
            );
        },
    },
    {
        accessorKey: "user",
        header: "Receiver",
        cell: ({ row }) => {
            return <span>{row.original.user.name}</span>;
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.amount)}</span>;
        },
    },

    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return <span>{dateTimeFormat(row.original.created_at)}</span>;
        },
    },
];

export const crediSaleOrderItemColumns : ColumnDef<OrderItem>[] = [
    {
        accessorKey: 'product',
        header: 'Product',
        cell: ({ row }) => {
            return <span>{row.original.product.name}</span>
        }
    },
    {
        accessorKey: 'qty',
        header: 'Qty',
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.qty)}</span>
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.price)}</span>
        }
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total)}</span>
        }
    },
]
