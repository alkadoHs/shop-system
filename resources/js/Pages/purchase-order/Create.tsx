import React, { FormEventHandler, useState } from "react";
import { Supplier } from "../suppliers/columns";
import { Product } from "../products/Index";
import { Payment } from "../payments/Index";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    ComboBox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
} from "@/components/Combobox";
import { branch } from "@/types";
import InputError from "@/Components/InputError";
import { Input } from "@/components/ui/input";
import FormRepeater from "@/components/form-repeater";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loanding-button";
import { set } from "date-fns";
import { toast } from "sonner";

interface Item {
    product_id?: number;
    qty: number;
    buy_price: number;
    sale_price: number;
}

const initialItem: Item = {
    product_id: undefined,
    qty: 1,
    buy_price: 0,
    sale_price: 0,
};

const Create = ({
    suppliers,
    products,
    paymentMethods,
    branches,
    today,
}: {
    suppliers: Supplier[];
    products: Product[];
    paymentMethods: Payment[];
    branches: branch[];
    today: string;
}) => {
    const [items, setItems] = useState<Item[]>([initialItem]);

    const { data, setData, errors, post, processing, reset } = useForm({
        supplier_id: "",
        branch_id: "",
        payment_method_id: "",
        date: today,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route("purchases.store"),
            {
                supplier_id: data.supplier_id,
                branch_id: data.branch_id,
                payment_method_id: data.payment_method_id,
                date: data.date,
                items: items as any,
            },
            {
                onSuccess: () => {
                    toast.success("Purchase order created successfully");
                    reset();
                    setItems([initialItem]);
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
    };

    return (
        <Authenticated>
            <Head title="Create Purchase Order" />

            <section className="p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="-mx-4 md:-mx-0">
                        <CardHeader>
                            <CardTitle>Create purchse order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <Label htmlFor="supplier">
                                            Supplier
                                        </Label>
                                        <ComboBox
                                            value={data.supplier_id.toString()}
                                            onValueChange={(value) =>
                                                setData(
                                                    "supplier_id",
                                                    value as any
                                                )
                                            }
                                        >
                                            <ComboboxInput placeholder="Select supplier" />
                                            <ComboboxContent>
                                                {suppliers.map((supplier) => (
                                                    <ComboboxItem
                                                        key={supplier.id}
                                                        value={supplier.id.toString()}
                                                        label={supplier.name}
                                                    >
                                                        {supplier.name}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxContent>
                                        </ComboBox>
                                        <InputError
                                            message={errors.supplier_id}
                                        />
                                    </div>
                                    {/* branch_id */}
                                    <div className="space-y-1">
                                        <Label htmlFor="branch">Branch</Label>
                                        <ComboBox
                                            value={data.branch_id.toString()}
                                            onValueChange={(value) =>
                                                setData(
                                                    "branch_id",
                                                    value as any
                                                )
                                            }
                                        >
                                            <ComboboxInput placeholder="Select branch" />
                                            <ComboboxContent>
                                                {branches.map((branch) => (
                                                    <ComboboxItem
                                                        key={branch.id}
                                                        value={branch.id.toString()}
                                                        label={branch.name}
                                                    >
                                                        {branch.name}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxContent>
                                        </ComboBox>
                                        <InputError
                                            message={errors.branch_id}
                                        />
                                    </div>
                                    {/* payment method */}
                                    <div className="space-y-1">
                                        <Label htmlFor="payment_method">
                                            Payment method{" "}
                                        </Label>
                                        <ComboBox
                                            value={data.payment_method_id.toString()}
                                            onValueChange={(value) =>
                                                setData(
                                                    "payment_method_id",
                                                    value as any
                                                )
                                            }
                                        >
                                            <ComboboxInput placeholder="Select payment method" />
                                            <ComboboxContent>
                                                {paymentMethods.map(
                                                    (paymentMethod) => (
                                                        <ComboboxItem
                                                            key={
                                                                paymentMethod.id
                                                            }
                                                            value={paymentMethod.id.toString()}
                                                            label={
                                                                paymentMethod.name
                                                            }
                                                        >
                                                            {paymentMethod.name}
                                                        </ComboboxItem>
                                                    )
                                                )}
                                            </ComboboxContent>
                                        </ComboBox>
                                        <InputError
                                            message={errors.payment_method_id}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="date">
                                            Purchase date
                                        </Label>
                                        <Input
                                            type="date"
                                            id="date"
                                            value={data.date}
                                            onChange={(e) =>
                                                setData("date", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="-mx-4 md:-mx-0">
                        <CardHeader>
                            <CardTitle>Purchase Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <h1 className="text-xl font-semibold mb-4">
                                    Add Items
                                </h1>
                                <FormRepeater<Item>
                                    initialValues={initialItem}
                                    onChange={(updatedItems) =>
                                        setItems(updatedItems)
                                    } // Update the state
                                    renderFields={(
                                        item,
                                        index,
                                        handleChange
                                    ) => (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div>
                                                <Label htmlFor="product_id">
                                                    Product
                                                </Label>
                                                <ComboBox
                                                    value={item.product_id?.toString()}
                                                    onValueChange={(value) => {
                                                        const selectedProduct =
                                                            products.find(
                                                                (product) =>
                                                                    product.id.toString() ===
                                                                    value
                                                            );
                                                        if (selectedProduct) {
                                                            handleChange(
                                                                index,
                                                                undefined,
                                                                {
                                                                    product_id:
                                                                        selectedProduct.id,
                                                                    buy_price:
                                                                        selectedProduct.buy_price,
                                                                    sale_price:
                                                                        selectedProduct.sale_price,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <ComboboxInput placeholder="Select product" />
                                                    <ComboboxContent>
                                                        {products
                                                            // Filter out products that are already selected
                                                            .filter(
                                                                (product) =>
                                                                    !items.some(
                                                                        (
                                                                            item,
                                                                            i
                                                                        ) =>
                                                                            item.product_id ===
                                                                                product.id &&
                                                                            i !==
                                                                                index
                                                                    )
                                                            )
                                                            .map((product) => (
                                                                <ComboboxItem
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    value={product.id.toString()}
                                                                    label={
                                                                        product.name
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </ComboboxItem>
                                                            ))}
                                                    </ComboboxContent>
                                                </ComboBox>
                                            </div>
                                            <div>
                                                <Label htmlFor="qty">
                                                    Quantity
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "qty",
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="buy_price">
                                                    Buying Price
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={item.buy_price}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "buy_price",
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="sale_price">
                                                    Selling Price
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={item.sale_price}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "sale_price",
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex justify-center gap-2 pt-4">
                            <Button variant={"outline"} asChild>
                                <Link href={route("purchases.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <LoadingButton type="submit" loading={processing}>
                                {processing ? "Saving..." : "Create purchase"}
                            </LoadingButton>
                        </CardContent>
                    </Card>
                </form>
            </section>
        </Authenticated>
    );
};

export default Create;
