import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { branch } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon, Eye } from "lucide-react";
import { EditBranch } from "./actions/edit-branch";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

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
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <EditBranch branch={row.original} />
                    <Button
                        onClick={() => {
                        if (
                                confirm("Are you sure you want to delete this branch?")
                            ) {
                        }
                            router.delete(
                                route("branches.destroy", row.original.id),
                                {
                                    onSuccess: () => {
                                        toast.success(
                                            "Branch deleted successfully"
                                        );
                                    },
                                    onError: (errors) => {
                                        toast.error(
                                            "Unexpected error occurred, pleease try again later!"
                                        );
                                    },
                                }
                            )
                        }}
                        variant={"destructive"}
                        size={"icon"}
                    >
                        <DeleteIcon className="size-4 mr-1" />
                    </Button>
                </div>
            );
        },
    },
];
