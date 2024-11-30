import React, { FormEventHandler } from "react";
import { cartItem } from "../columns";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import BarcodeModal from "./BarcodeModal";
import InputError from "@/Components/InputError";
import { LoadingButton } from "@/components/ui/loanding-button";

const EditItem = ({ item }: { item: cartItem }) => {
    const [imei, setImei] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [stopStream, setStopStream] = React.useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        qty: item.qty,
        company: item.company,
        imei: item.imei ?? imei,
    });

    const save: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("carts.update", item.id), {
            onSuccess: () => {
                toast.success("Saved successfully.");
                reset();
            },
            onError: () => {
                toast.error("Failed to save due to errors.");
            },
        });
    };

    return (
        <form className="font-medium grid gap-2" onSubmit={save}>
            <p className="text-lg text-primary">- {item.product?.name}</p>
            <Input
                className="text-right min-w-20"
                value={data.qty}
                onChange={(e) => setData("qty", parseFloat(e.target.value))}
            />
            <InputError message={errors.qty} />

            <Input
                type="text"
                name="company"
                value={data.company}
                onChange={(e) => setData("company", e.target.value)}
                placeholder="Company name"
                required
            />
            <InputError message={errors.company} />

            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    name="imei"
                    value={data.imei}
                    onChange={(e) => setData("imei", e.target.value)}
                    placeholder="IMEI number"
                    required
                />
                <BarcodeModal
                    onUpdate={(err, result) => {
                        if (result) {
                            setImei(result.text);
                            setStopStream(true);
                            setTimeout(() => setOpen(false), 0);
                        } else setImei("Not Found");
                    }}
                    imei={imei}
                    modalOpen={open}
                    onModalOpen={setOpen}
                    stopStream={stopStream}
                />
            </div>
            <p>Imei: {imei}</p>
            <InputError message={errors.imei} />

            <div>
                <LoadingButton type="submit" loading={processing}>
                    Save
                </LoadingButton>
            </div>
        </form>
    );
};

export default EditItem;
