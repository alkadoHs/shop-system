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
import { Edit, PlusCircle } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { Supplier } from "../columns";

export function EditSupplier({ supplier }: { supplier: Supplier }) {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, errors, patch } = useForm({
        name: supplier.name,
        contact: supplier.contact,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("suppliers.update", supplier.id), {
            onSuccess: () => {
                setOpen(false)
                toast.success("Updated successfully");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <Edit/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update supplier</DialogTitle>
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
                            {processing ? "Updating..." : "Save"}
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
