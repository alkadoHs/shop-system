import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalFooter,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "@/components/ui/responsoive-model";
import { OrderItem } from "@/Pages/credit-sales/columns";
import { Edit } from "lucide-react";
import React, { FormEventHandler, useState } from "react";
import { pendingOrderItemColumns } from "../columns";
import { LoadingButton } from "@/components/ui/loanding-button";
import { router, useForm } from "@inertiajs/react";
import { toast } from "sonner";

const EditPendingOrder = ({
    orderItems,
    orderId,
}: {
    orderItems: OrderItem[];
    orderId: number;
}) => {
    const { processing, patch } = useForm({});

    const [open, setOpen] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("pending-orders.confirm-all", orderId), {
            onSuccess: () => {
                setOpen(false)
                toast.success('Confirmed successfully')
            }
        });
    };

    return (
        <ResponsiveModal open={open} onOpenChange={setOpen}>
            <ResponsiveModalTrigger>
                <Badge className="cursor-pointer">
                    <Edit className="size-5 mr-1" />
                    View
                </Badge>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent autoFocus={false}>
                <form onSubmit={submit}>
                    <ResponsiveModalHeader>
                        <ResponsiveModalTitle>
                            Edit order{" "}
                            <span className="text-primary font-bold">
                                #{orderId}
                            </span>
                        </ResponsiveModalTitle>
                    </ResponsiveModalHeader>
                    <div className="my-6 overflow-auto">
                        <DataTable
                            columns={pendingOrderItemColumns}
                            data={orderItems}
                        />
                    </div>
                    <ResponsiveModalFooter className="gap-3">
                        <LoadingButton
                            type="button"
                            variant={"outline"}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </LoadingButton>
                        <LoadingButton loading={processing} type="submit">
                            Confirm order
                        </LoadingButton>
                    </ResponsiveModalFooter>
                </form>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};

export default EditPendingOrder;
