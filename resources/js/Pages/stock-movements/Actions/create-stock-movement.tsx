import {
    ComboBox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
} from "@/components/Combobox";
import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loanding-button";
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalFooter,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "@/components/ui/responsoive-model";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { numberFormat } from "@/lib/utils";
import { Products } from "@/Pages/products/Index";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

const CreateStockvement = ({ products }: { products: Products }) => {
    const [open, setOpen] = useState(false);

    const user = usePage().props.auth.user;

    const { data, setData, errors, processing, reset, post } = useForm({
        product_id: "",
        status: "in",
        stock: 0,
        description: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("stock-movements.store"), {
            onSuccess: () => {
                toast.success("Saved successfully.");
                reset();
            },
            onError: (errors) => {
                toast.error(errors.stock);
            }
        });
    };

    return (
        <ResponsiveModal open={open} onOpenChange={setOpen}>
            <ResponsiveModalTrigger asChild>
                <Button>Add new</Button>
            </ResponsiveModalTrigger>

            <ResponsiveModalContent>
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle>
                        Create Stock Movement
                    </ResponsiveModalTitle>
                    <ResponsiveModalDescription>
                        Your current branch is{" "}
                        <span className="uppercase text-primary">
                            {user.branch.name}
                        </span>
                    </ResponsiveModalDescription>
                </ResponsiveModalHeader>

                <form onSubmit={submit} className="flex flex-col gap-4 mb-4">
                    <div className="space-y-1">
                        <Label htmlFor="product_id">Product</Label>
                        <ComboBox
                            value={data.product_id}
                            onValueChange={(value) =>
                                setData("product_id", value as string)
                            }
                        >
                            <ComboboxInput placeholder="Select product" />
                            <ComboboxContent>
                                {products.data.map((product) => (
                                    <ComboboxItem
                                        key={product.id}
                                        value={product.id.toString()}
                                        label={product.name}
                                    >
                                        <span className="text-sm text-foreground">
                                            {product.name} (
                                            {numberFormat(product.stock)})
                                        </span>
                                    </ComboboxItem>
                                ))}
                            </ComboboxContent>
                        </ComboBox>
                        <InputError message={errors.product_id} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="in" value="in">
                                    IN product
                                </SelectItem>
                                <SelectItem key="out" value="out">
                                    OUT product
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            type="number"
                            id="stock"
                            value={data.stock}
                            onChange={(e) =>
                                setData("stock", parseFloat(e.target.value))
                            }
                        />
                        <InputError message={errors.stock} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="description">description</Label>
                        <Input
                            type="text"
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        <InputError message={errors.description} />
                    </div>

                    <ResponsiveModalFooter>
                        <LoadingButton
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={processing}
                            variant={"outline"}
                        >
                            Cancel
                        </LoadingButton>
                        <LoadingButton type='submit' loading={processing}>Save</LoadingButton>
                    </ResponsiveModalFooter>
                </form>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};

export default CreateStockvement;
