import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { access } from "fs";
import EditUser from "./actions/edit-user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Key } from "lucide-react";

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
        cell: ({ row }) => {
            const branch = row.original?.branch;
            return <>{branch?.name}</>;
        },
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original?.isActive;
            return (
                <>
                    {isActive ? (
                        <Badge>{"active"}</Badge>
                    ) : (
                        <Badge variant={"destructive"}>{"blocked"}</Badge>
                    )}
                </>
            );
        },
    },
    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <EditUser user={row.original} />

                    <Button
                        className="gap-2"
                        onClick={() => {
                            if (confirm(row.original.isActive ? "Are you sure you want to block this user?" : "Are you sure you want to unblock this user?"))
                                router.delete(
                                    route("users.destroy", row.original.id)
                                );
                        }}
                        variant={"destructive"}
                    >
                        {row.original.isActive ? "Block" : "Unblock"}
                    </Button>
                </div>
            );
        },
    },
];
