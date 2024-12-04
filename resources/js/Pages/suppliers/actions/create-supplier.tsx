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
import { LoadingButton } from "@/components/ui/loanding-button";
import { useForm } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export function CreateSupplier() {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
        contact: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("suppliers.store"), {
            onSuccess: () => {
                setOpen(false)
                toast.success("Created successfully");
            },
        });

        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <PlusCircle className="size-4 mr-1" />
                    Add supplier
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new supplier</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4 space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <InputLabel htmlFor="contact" value="Contacts(phone,email...)" />

                        <Input
                            id="contact"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.contact}
                            onChange={(e) => setData("contact", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.contact} />
                    </div>
                    <DialogFooter>
                        <LoadingButton loading={processing} type="submit">
                            {processing ? "Adding..." : "Save"}
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
