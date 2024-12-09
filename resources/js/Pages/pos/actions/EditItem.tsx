import React, { FormEventHandler } from "react";
import { cartItem } from "../columns";
import { Input } from "@/components/ui/input";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import BarcodeModal from "./BarcodeModal";
import InputError from "@/Components/InputError";
import { LoadingButton } from "@/components/ui/loanding-button";
import { ComboBox, ComboboxContent, ComboboxInput, ComboboxItem } from "@/components/Combobox";
import { ProductCompany } from "@/Pages/product-companies/columns";

const EditItem = ({ item }: { item: cartItem }) => {
    const [imei, setImei] = React.useState("");
    const [imei2, setImei2] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [stopStream, setStopStream] = React.useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        qty: item.qty,
        company: item.company,
        imei: item.imei ?? imei,
        imei2: item.imei2 ?? imei2,
        discount: item.discount,
    });

    const companies: ProductCompany[] = usePage().props.productCompanies as ProductCompany[]

    const save: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("carts.update", item.id), {
            onSuccess: () => {
                toast.success("Saved successfully.");
                router.reload();
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
                className="min-w-20"
                type="number"
                value={data.qty}
                onChange={(e) => setData("qty", parseFloat(e.target.value))}
            />
            <InputError message={errors.qty} />

            <ComboBox value={data.company} onValueChange={(value) => setData("company", value as string)}>
                <ComboboxInput placeholder="Select company" />

                <ComboboxContent>
                    {companies?.map(company => (
                        <ComboboxItem value={company.name} key={company.id} label={company.name}>{company.name}</ComboboxItem>
                    ))}
                </ComboboxContent>
            </ComboBox>
            <InputError message={errors.company} />

            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    name="imei"
                    value={data.imei}
                    onChange={(e) => setData("imei", e.target.value)}
                    placeholder="IMEI1"
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
            <p>Imei1: {imei}</p>
            <InputError message={errors.imei2} />
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    name="imei2"
                    value={data.imei2}
                    onChange={(e) => setData("imei2", e.target.value)}
                    placeholder="IMEI2"
                />
                <BarcodeModal
                    onUpdate={(err, result) => {
                        if (result) {
                            setImei2(result.text);
                            setStopStream(true);
                            setTimeout(() => setOpen(false), 0);
                        } else setImei2("Not Found");
                    }}
                    imei={imei2}
                    modalOpen={open}
                    onModalOpen={setOpen}
                    stopStream={stopStream}
                />
            </div>
            <p>Imei2: {imei2}</p>
            <InputError message={errors.imei2} />

            <p className="text-destructive">Discount</p>
            <Input
                className="text-right min-w-20"
                value={data.discount}
                type="number"
                onChange={(e) => setData("discount", e.target.value as any)}
                placeholder="Discount"
            />
            <InputError message={errors.discount} />

            <div>
                <LoadingButton type="submit" loading={processing}>
                    Save
                </LoadingButton>
            </div>
        </form>
    );
};

export default EditItem;
