import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loanding-button";
import { Payment } from "@/Pages/payments/Index";
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import { toast } from "sonner";

const OrderDetails = ({ payments, total }: { payments: Payment[], total: number }) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        status: "paid",
        payment_method_id: "",
        customer: "",
        contact: "",
        location: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("orders.store"), {
            onSuccess: () => {
                reset()
                toast.success("Processed successfully!");
            },
            onError: () => {
                toast.error("Failed to process this order.");
            },
        });
    };
    return (
        <Card className="my-6 -mx-4 md:-mx-0">
            <CardHeader>
                <CardTitle>Order details</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={"paid"} value={"paid"}>
                                    Paid
                                </SelectItem>
                                <SelectItem key={"pending"} value={"pending"}>
                                    Pending order
                                </SelectItem>
                                <SelectItem key={"credit"} value={"credit"}>
                                    Credit sale
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="payment_method_id">
                            Payment method
                        </Label>
                        <Select
                            value={data.payment_method_id}
                            onValueChange={(value) =>
                                setData("payment_method_id", value)
                            }
                        >
                            <SelectTrigger id="payment_method_id">
                                <SelectValue placeholder="Select payment method" />
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
                        <Label htmlFor="customer">Customer name</Label>
                        <Input
                            type="text"
                            id="customer"
                            value={data.customer}
                            onChange={(e) =>
                                setData("customer", e.target.value)
                            }
                            placeholder="Name"
                            required
                        />
                        <InputError message={errors.customer} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="contact">Phone number</Label>
                        <Input
                            type="text"
                            id="contact"
                            value={data.contact}
                            onChange={(e) =>
                                setData("contact", e.target.value)
                            }
                            placeholder=""
                            required
                        />
                        <InputError message={errors.contact} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            type="text"
                            id="location"
                            value={data.location}
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                            placeholder=""
                            required
                        />
                        <InputError message={errors.location} />
                    </div>
                    <div className="flex gap-2">
                        <LoadingButton type="submit" loading={processing} disabled={total <= 0}>
                            {processing ? "Processing..." : "Complete"}
                        </LoadingButton>
                        <LoadingButton type="button" variant={"outline"}>
                            Clear
                        </LoadingButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default OrderDetails;
