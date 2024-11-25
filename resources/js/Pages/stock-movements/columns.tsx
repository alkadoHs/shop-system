import { User } from "@/types";
import { Product } from "../products/Index";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { dateFormatFilter, numberFormat } from "@/lib/utils";

export type PaginationLink = {
    url: string;
    label: string;
    active: boolean;
};

export interface StockMovement {
    id: number;
    product: Product;
    user: User;
    status: string;
    stock: number;
    description: string;
    last_stock: number;
    created_at: string;
}

export interface StockMovements {
    data: StockMovement[];
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

export const stockMovementColumns: ColumnDef<StockMovement>[] = [
    {
        accessorKey: "Date",
        header: "Created At",
        cell: ({ row }) => {
            return <div>{dateFormatFilter(row.original.created_at)}</div>;
        }
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
            const product = row.original.product;
            return <div>{product.name}</div>;
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return <div>{user.name}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <div>
                    {status == "in" ? (
                        <Badge>IN</Badge>
                    ) : (
                        <Badge  variant={"destructive"}>OUT</Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = row.original.stock;
            return <div>{numberFormat(stock)}</div>;
        }
    },
    {
        accessorKey: "last_stock",
        header: "Last Stock",
        cell: ({ row }) => {
            const prev_stock = row.original.last_stock;
            return <div>{numberFormat(prev_stock)}</div>;
        }
    },
    {
        accessorKey: "description",
        header: "Descriiption",
        cell: ({ row }) => {
            const description = row.original.description;
            return <div>{description ? description : '-'}</div>;
        }
    }
   
];
