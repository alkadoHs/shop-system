import React from "react";
import { cartItem } from "../columns";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { ScanBarcode } from "lucide-react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import BarcodeModal from "./BarcodeModal";

const EditItem = ({ item }: { item: cartItem }) => {
    const [data, setData] = React.useState("Not Found");

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
        <div className="font-medium grid gap-2">
            <NumericFormat
                className="text-right min-w-20"
                customInput={Input}
                defaultValue={item.qty}
                onChange={handleChange}
                thousandSeparator=","
                allowLeadingZeros
                allowNegative={false}
            />

            <Input type="text" name="company" placeholder="Company name" />

            <div className="flex items-center gap-2">
                <Input type="text" name="imei" placeholder="IMEI number" />
                <Button
                    variant={"secondary"}
                    className="text-orange-500"
                    size={"icon"}
                >
                    <BarcodeModal
                        onUpdate={(err, result) => {
                            if (result) setData(result.text);
                            else setData("Not Found");
                        }}
                    />
                </Button>
            </div>

            <p>{data}</p>
        </div>
    );
};

export default EditItem;
