import React, { FormEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/Components/InputError";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { branch, User } from "@/types";
import { Edit } from "lucide-react";
import Checkbox from "@/Components/Checkbox";
import { LoadingButton } from "@/components/ui/loanding-button";

export default function EditUser({ user }: { user: User }) {
    const [open, setOpen] = React.useState(false);

    const { data, setData, patch, processing, reset, errors } = useForm({
        branch_id: user.branch_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    });

    const branches: branch[] = usePage().props.branches as branch[];

    const onsubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("users.update", user.id), {
            onSuccess: () => {
                toast.success("Updated successfully.");
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button size={'icon'}>
                        <Edit />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                    <DialogHeader className="flex flex-col gap-1">
                        <DialogTitle>Update User</DialogTitle>
                    </DialogHeader>
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
                                    placeholder="Name"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="col-span-6 md:col-span-3 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="branch_id">User Branch</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("branch_id", parseInt(value))
                                    }
                                    value={data.branch_id.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="select branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches &&
                                            branches.map((branch) => (
                                                <SelectItem
                                                    key={branch.id}
                                                    value={branch.id.toString()}
                                                >
                                                    {branch.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.branch_id} />
                            </div>
                            <div className="col-span-6 md:col-span-3 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="role">Role(Permission)</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("role", value)
                                    }
                                    value={data.role}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            key={"admin"}
                                            value={"admin"}
                                        >
                                            ADMIN
                                        </SelectItem>
                                        <SelectItem
                                            key={"seller"}
                                            value={"seller"}
                                        >
                                            SELLER
                                        </SelectItem>
                                        {/* <SelectItem
                                            key={"vendor"}
                                            value={"vendor"}
                                        >
                                            VENDOR
                                        </SelectItem> */}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>
                            <div className="col-span-6 md:col-span-3 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Email"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="col-span-6 md:col-span-3 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input
                                    type="number"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="Phone"
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <LoadingButton type="submit" loading={processing}>
                                Update
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}