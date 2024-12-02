import ActionButton from "@/components/action-button";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export interface ProductCompany {
    id: number;
    name: string;
    created_at: string;
}

export const productCompanyColumns: ColumnDef<ProductCompany>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <div className="">
                    <ActionButton
                        onClick={(e) => {
                            if (confirm("Are you sure?"))
                                router.delete(
                                    route(
                                        "product-companies.destroy",
                                        row.original.id
                                    ),
                                    {
                                        onSuccess: () =>
                                            toast.success(
                                                "Deleted successfully."
                                            ),
                                    }
                                );
                        }}
                        variant="delete"
                    />
                </div>
            );
        },
    },
];
