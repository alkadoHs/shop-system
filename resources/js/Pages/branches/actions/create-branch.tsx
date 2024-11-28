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

export function CreateBranch() {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("branches.store"), {
            onSuccess: () => {
                setOpen(false)
                toast.success("Branch created successfully");
            },
        });

        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <PlusCircle className="size-4 mr-1" />
                    Add Branch
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Branch</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4 ">
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
                    <DialogFooter>
                        <LoadingButton loading={processing} type="submit">
                            {processing ? "Creating..." : "Save"}
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
