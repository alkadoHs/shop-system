import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { branch } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export const branchColumns: ColumnDef<branch>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "users_count",
        header: "Users",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.users_count)}</span>;
        },
    },
    {
        accessorKey: "products_count",
        header: "Products",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.products_count)}</span>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return <span>{dateTimeFormat(row.original.created_at)}</span>;
        },
    },
    // {
    //     accessorKey: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => {
    //         return (
    //             <div>
    //                 <Eye className="size-6" />
    //             </div>
    //         );
    //     },
    // },
];
