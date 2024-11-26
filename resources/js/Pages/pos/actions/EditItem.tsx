import React from "react";
import { cartItem } from "../columns";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { NumericFormat } from "react-number-format";

const EditItem = ({ item }: { item: cartItem }) => {
    const handleChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const qty = Number(e.target.value.replaceAll(",", ""));

            if (qty > 0)
                router.patch(
                    route("carts.update", item.id),
                    { qty },
                    {
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess: () => {
                            toast.success("Item updated successfully");
                        },
                        onError: (errors) => {
                            toast.error(errors.qty);
                        },
                    }
                );
        },
        1000
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
            />
        </div>
    );
};

export default EditItem;
