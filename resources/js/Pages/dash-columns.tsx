import { ColumnDef } from "@tanstack/react-table";
import { OrderItem } from "./credit-sales/columns";
import { dateTimeFormat, numberFormat, timeFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquareXIcon, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
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
        accessorKey: "qty",
        header: "Qty sold",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.price)}</span>;
        },
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
            return (
                <Button
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
