import { Card, CardContent } from "@/components/ui/card";
import { H2 } from "@/components/ui/heading-with-anchor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Payment } from "../payments/Index";
import { LoadingButton } from "@/components/ui/loanding-button";
import { toast } from "sonner";
import InputError from "@/Components/InputError";
import { ExpenseItem, expenseItemColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { TableCell } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";

const Expenses = ({
    payments,
    expenses,
    total,
}: {
    payments: Payment[];
    expenses: ExpenseItem[];
    total: number;
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        payment_method_id: "",
        item: "",
        cost: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("expenses.store"), {
            onSuccess: () => {
                reset("cost");
                reset("item");
                toast.success("Expense added successfully");
            },
            onError: () => {
                toast.error('Failed to save expense');
            }
         });
    };

    return (
        <Authenticated>
            <Head title="Expenses" />

            <section className="p-4 space-y-4">
                <H2>Expenses</H2>

                <Card className="-mx-4 md:-mx-0">
                    <CardContent className="pt-4">
                        <form onSubmit={submit} className="">
                            <div className="space-y-4">
                                <div className="space-y-1 col-span-2">
                                    <Label htmlFor="payment_method_id">
                                        Payment method
                                    </Label>
                                    <Select
                                        value={data.payment_method_id}
                                        onValueChange={(value) =>
                                            setData("payment_method_id", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a payment method" />
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
                                    <InputError
                                        message={errors.payment_method_id}
                                    />
                                </div>
                                <div>
                                    <DataTable
                                        columns={expenseItemColumns}
                                        data={expenses}
                                        footer={
                                            <>
                                                <TableCell>
                                                    <b>TOTAL</b>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <b>{`Tsh ${numberFormat(
                                                        total
                                                    )}`}</b>
                                                </TableCell>
                                                <TableCell></TableCell>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="flex w-full max-w-lg gap-4">
                                    <div className="space-y-1 w-full">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            value={data.item}
                                            onChange={(e) =>
                                                setData("item", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.item} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="cost">Cost</Label>
                                        <Input
                                            id="cost"
                                            type="number"
                                            name="cost"
                                            value={data.cost}
                                            onChange={(e) =>
                                                setData("cost", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.cost} />
                                    </div>
                                    <div className="pt-7">
                                        <LoadingButton
                                            loading={processing}
                                            type="submit"
                                        >
                                            Save
                                        </LoadingButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </Authenticated>
    );
};

export default Expenses;
