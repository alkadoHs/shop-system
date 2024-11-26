import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../products/Index";
import { router } from "@inertiajs/react";
import { numberFormat } from "@/lib/utils";
import ActionButton from "@/components/action-button";
import EditItem from "./actions/EditItem";
import { toast } from "sonner";

export type cartItem = {
    id: number;
    product: Product;
    qty: number;
    price: number;
};

export const cartProductColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const product = row.original; // Access the full product data
            return (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        router.post(route("carts.add", product.id), {}, {
                            preserveScroll: true,
                            preserveState: true,
                            onSuccess: () => {
                                toast.success("Item added to cart");
                            },
                            onError: (errors) => {
                                toast.error("Unexpected error occurred, pleease try again later!");;
                            },
                        });
                    }}
                    className="text-primary hover:underline"
                >
                    {product.name}
                </a>
            );
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = row.original.stock;
            return <div className="font-medium">{stock}</div>;
        },
    },
    // sale_price
    {
        accessorKey: "sale_price",
        header: "Sale price",
        cell: ({ row }) => {
            const price = row.original.sale_price;
            return <div className="font-medium">{numberFormat(price)}</div>;
        },
    },
    {
        accessorKey: "whole_stock",
        header: "Whole stock",
    },
    {
        accessorKey: "whole_price",
        header: "Whole price",
        cell: ({ row }) => {
            const price = row.original.whole_price;
            return <div className="font-medium">{numberFormat(price)}</div>;
        },
    },
];

export const cartItemColumns: ColumnDef<cartItem>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const product = row.original.product; // Access the full product data
            return (
                <a className="text-primary hover:underline">{product.name}</a>
            );
        },
    },
    {
        accessorKey: "qty",
        header: "Qty",
        cell: ({ row }) => {
            const qty = row.original.qty;
            return <EditItem item={row.original} />;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.original.price;
            return <div className="font-medium">{numberFormat(price)}</div>;
        },
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            const total = row.original.qty * row.original.price;
            return <div className="font-medium">{numberFormat(total)}</div>;
        },
    },
    // delete action
    {
        accessorKey: "delete",
        header: "Delete",
        cell: ({ row }) => {
            const item = row.original; // Access the full product data
            return (
                <ActionButton
                    variant="delete"
                    onClick={(e) => {
                        e.preventDefault();
                        if (
                            confirm(
                                "Are you sure you want to delete this item?"
                            )
                        )
                            router.delete(route("carts.remove", item.id), {
                                preserveScroll: true,
                                preserveState: true,
                                onSuccess: () => {
                                    toast.success("Item removed from cart");
                                },
                                onError: (errors) => {
                                    toast.error("Unexpected error occurred, pleease try again later!");;
                                },
                            });
                    }}
                    className="text-red-600 hover:underline"
                />
            );
        },
    },
];
