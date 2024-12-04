import { ColumnDef } from "@tanstack/react-table";
import { EditSupplier } from "./actions/edit-supplier";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

export interface Supplier {
    id: number;
    company_id: number;
    name: string;
    contact: string;
}

export const supplierColumns: ColumnDef<Supplier>[] = [
    {
        accessorKey: "name",
        header: "Supplier Name",
    },
    {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ row }) => {
            return (
                <span>{row.original.contact ? row.original.contact : "-"}</span>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <EditSupplier supplier={row.original} />

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                            if (
                                confirm(
                                    "Are you sure you want to delete this supplier?"
                                )
                            )
                                router.delete(
                                    route("suppliers.destroy", row.original.id), {
                                        onSuccess: () => {
                                            toast.success('Supplier deleted successfully');
                                        },
                                    }
                                );
                        }}
                    >
                        <Trash2 />
                    </Button>
                </div>
            );
        },
    },
];
