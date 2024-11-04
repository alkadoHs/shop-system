import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import InputError from "@/Components/InputError";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product } from "./Index";
import { Loader2 } from "lucide-react";

export default function CreateProduct({ product }: { product: Product }) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        ...product,
    });

    const onsubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("products.update", product.id), {
            onSuccess: () => {
                toast.success("Updated successfully.");
                reset();
            },
        });
    };

    return (
        <Authenticated header={<h2>Update {product.name}</h2>}>
            <Head title={`Update ${product.name}`} />

            <main>
                <Card>
                    <CardHeader className="flex flex-col gap-1">
                        <CardTitle>Update {product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-4xl">
                        <form onSubmit={onsubmit}>
                            <div className="grid grid-cols-6 gap-4">
                                <div className="col-span-6 md:col-span-3 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Product name"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="buy_price">
                                        Buying price
                                    </Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="buy_price"
                                        value={data.buy_price}
                                        onChange={(e) =>
                                            setData(
                                                "buy_price",
                                                e.target.value as any
                                            )
                                        }
                                        placeholder="Product buy_price"
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.buy_price} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="sale_price">
                                        Selling price
                                    </Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="sale_price"
                                        value={data.sale_price}
                                        onChange={(e) =>
                                            setData(
                                                "sale_price",
                                                e.target.value as any
                                            )
                                        }
                                        placeholder="Product sale_price"
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.sale_price} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="stock">Stock</Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="stock"
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData(
                                                "stock",
                                                e.target.value as any
                                            )
                                        }
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.stock} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="stock_alert">
                                        Stock Alert
                                    </Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="stock_alert"
                                        value={data.stock_alert}
                                        onChange={(e) =>
                                            setData(
                                                "stock_alert",
                                                e.target.value as any
                                            )
                                        }
                                        placeholder="Product stock_alert"
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.stock_alert} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="expire_date">
                                        Expire date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="expire_date"
                                        value={data.expire_date}
                                        onChange={(e) =>
                                            setData(
                                                "expire_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 space-x-4 my-4">
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="whole_sale">
                                        whole sale stock
                                    </Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="whole_sale"
                                        value={data.whole_stock}
                                        onChange={(e) =>
                                            setData(
                                                "whole_stock",
                                                e.target.value as any
                                            )
                                        }
                                        placeholder="Product whole_sale"
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.whole_stock} />
                                </div>
                                <div className="col-span-3 md:col-span-2 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="whole_price">
                                        Whole sale price
                                    </Label>
                                    <NumericFormat
                                        customInput={Input}
                                        id="whole_price"
                                        value={data.whole_price}
                                        onChange={(e) =>
                                            setData(
                                                "whole_price",
                                                e.target.value as any
                                            )
                                        }
                                        placeholder="Product whole_price"
                                        allowLeadingZeros
                                        allowNegative={false}
                                        thousandSeparator=","
                                    />
                                    <InputError message={errors.whole_price} />
                                </div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={processing}>
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </Authenticated>
    );
}
