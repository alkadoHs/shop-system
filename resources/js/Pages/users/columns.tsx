import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { access } from "fs";

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        //phone
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "branch.name",
        header: "Branch",
        cell: ({  row }) => {
            const branch = row.original.branch;
            return <>{branch.name}</>;
        },
    },
];
