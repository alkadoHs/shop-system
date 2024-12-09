import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loanding-button";
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsoive-model";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export function CreatePayment() {
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
        number: "",
    });

    const submit:FormEventHandler = (e) => {
        e.preventDefault()

        post(route('payments.store'), {
            onSuccess: () => {
                toast.success('Payment method and it\'s associated accounts created successfully.')
            }
        })

        reset()
    }

    return (
        <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
                <Button>Create payment</Button>
            </ResponsiveModalTrigger>
        
                <ResponsiveModalContent className="sm:max-w-[425px]">
                    <ResponsiveModalHeader>
                        <ResponsiveModalTitle>Create payment method</ResponsiveModalTitle>
                    </ResponsiveModalHeader>
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
                    <ResponsiveModalFooter>
                        <LoadingButton loading={processing} type="submit">Save</LoadingButton>
                    </ResponsiveModalFooter>
                    </form>
                </ResponsiveModalContent>
        </ResponsiveModal>
    );
}
