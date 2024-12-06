import { ColumnDef } from "@tanstack/react-table";
import { OrderItem } from "./credit-sales/columns";
import { dateTimeFormat, numberFormat, timeFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquareXIcon, Trash2 } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { toast } from "sonner";

export const transactionsColumns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "order.id",
        header: "Order No.",
        cell: ({ row }) => {
            return (
                <span className="font-semibold text-primary leading-tight">
                    #{row.original.order?.id}
                </span>
            );
        },
    },
    {
        accessorKey: "order.status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.order?.status;

            switch (status) {
                case "pending":
                    return <Badge variant={"warning"}>{status}</Badge>;
                    break;
                case "paid":
                    return <Badge variant={"success"}>{status}</Badge>;
                default:
                    return <Badge variant={"error"}>{status}</Badge>;
                    break;
            }
        },
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
        cell: ({ row }) => {
            return <span>{row.original.order?.customer?.name ?? "-"}</span>;
        },
    },
    {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => {
            return (
                <span className="whitespace-normal">
                    {row.original.product?.name}
                </span>
            );
        },
    },
    {
        accessorKey: 'imei',
        header: 'IMEI',
        cell: ({ row }) => {
            return (<div>
                <p>IMEI1:  <span className="text-primary">{row.original.imei ?? '__'}</span></p>
                <p>IMEI2: <span className="text-primary">{row.original.imei2 ?? '__'}</span></p>
            </div>)
        }
    },
    {
        accessorKey: 'company',
        header: 'Company',
    },
    {
        accessorKey: "qty",
        header: "Qty sold",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.qty)}</span>;
        }
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.price)}</span>;
        },
    },
    {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.discount)}</span>;
        }
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total)}</span>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Time",
        cell: ({ row }) => {
            return <span>{timeFormat(row.original.created_at)}</span>;
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const user = usePage().props.auth.user
            return (
                <Button
                    disabled={user.role !== 'admin'}
                    onClick={() => {
                        if (
                            confirm(
                                "Are you sure you want to delete this transaction?"
                            )
                        ) {
                            router.delete(
                                route("order-items.destroy", row.original.id),
                                {
                                    onSuccess: () => {
                                        toast.success(
                                            "Transaction deleted successfully"
                                        );
                                    },
                                    only: ["transactions"],
                                }
                            );
                        }
                    }}
                    variant={"destructive"}
                    size={"icon"}
                >
                    <SquareXIcon className="size-4" />
                </Button>
            );
        },
    },
];
