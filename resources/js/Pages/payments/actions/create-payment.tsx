import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export function CreatePayment() {
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
        number: "",
    });

    const submit:FormEventHandler = (e) => {
        e.preventDefault()

        post(route('payments.store'))

        reset()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create payment</Button>
            </DialogTrigger>
        
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create payment method</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="grid gap-4 py-4 ">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="number"
                                value="Payment number"
                            />

                            <Input
                                id="number"
                                className="mt-1 block w-full"
                                value={data.number}
                                onChange={(e) =>
                                    setData("number", e.target.value)
                                }
                                autoComplete="number"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.number}
                            />
                        </div>
                    <DialogFooter>
                        <Button disabled={processing} type="submit">Save</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    );
}
