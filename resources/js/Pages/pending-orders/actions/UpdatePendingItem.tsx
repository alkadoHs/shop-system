import React from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { NumericFormat } from "react-number-format";
import { OrderItem } from "@/Pages/credit-sales/columns";

const UpdatePendingItem = ({ item }: { item: OrderItem }) => {
    const handleChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const qty = Number(e.target.value.replaceAll(',', ''));

            if (qty > 0)
                router.patch(
                    route("pending-orders.update", item.id),
                    { qty },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            toast.success("Item updated successfully");
                        },
                        onError: (errors) => {
                            toast.error(errors.qty);
                        },
                    }
                );
        },
        2500
    );

    return (
        <div className="font-medium">
            <NumericFormat
                className="text-right max-w-20 min-w-20"
                customInput={Input}
                defaultValue={item.qty}
                onChange={handleChange}
                thousandSeparator=","
                allowLeadingZeros
                allowNegative={false}
                autoFocus={false}
            />
        </div>
    );
};

export default UpdatePendingItem;
