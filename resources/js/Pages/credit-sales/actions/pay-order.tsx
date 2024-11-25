import InputError from "@/Components/InputError";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Payment } from "@/Pages/payments/Index";
import { router, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import { CreditSale } from "../columns";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loanding-button";

const PayOrder = ({
    payments,
    creditSale,
}: {
    payments: Payment[];
    creditSale: CreditSale;
}) => {
    const { data, setData, post, reset, processing, errors } = useForm({
        payment_method_id: "",
        amount: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("credit-sale-payments.store", creditSale.id), {
            onSuccess: () => {
                toast.success("Paid successfully");
                reset();
            },
            preserveScroll: true,
        });
    };
    return (
        <Card className="-mx-4 md:-mx-0">
            <CardHeader>
                <CardTitle>Make payment</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid gap-3" onSubmit={submit}>
                    <div className="flex w-full gap-4">
                        <div className="space-y-1 w-full">
                            <Label htmlFor="payment_method_id">
                                Payment Method
                            </Label>
                            <Select
                                value={data.payment_method_id}
                                onValueChange={(value) =>
                                    setData("payment_method_id", value)
                                }
                            >
                                <SelectTrigger id="payment_method_id">
                                    <SelectValue placeholder="Select payment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {payments.map((payment) => (
                                        <SelectItem
                                            key={payment.id}
                                            value={payment.id.toString()}
                                        >
                                            {payment.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.payment_method_id} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                type="number"
                                value={data.amount}
                                id="amount"
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                            />
                            <InputError message={errors.amount} />
                        </div>
                    </div>

                    <div>
                        <LoadingButton type={"submit"} loading={processing}>
                            Add payment
                        </LoadingButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default PayOrder;
