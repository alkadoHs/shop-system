import React, { FormEventHandler } from "react";
import { FilterIcon } from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { setDate } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loanding-button";
import { User } from "@/types";
import {
    ComboBox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
} from "../Combobox";
import { useDebouncedCallback } from "use-debounce";

export function FilterByUser({ url, users }: { url: string; users: User[] }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"}>
                    <FilterIcon className="size-5 mr-1" />
                    By user
                </Button>
            </PopoverTrigger>

            <PopoverContent className="wPP-80">
                <div className="space-y-1">
                    <Label htmlFor="startDate">From date</Label>
                    <ComboBox
                        onValueChange={(value) => {
                            router.get(
                                url,
                                { user_id: value },
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                }
                            );
                        }}
                    >
                        <ComboboxInput placeholder="Search user" />

                        <ComboboxContent>
                            {users?.map((user) => (
                                <ComboboxItem
                                    key={user.id}
                                    value={user.id.toString()}
                                    label={user.name}
                                >
                                    {user.name}
                                </ComboboxItem>
                            ))}
                        </ComboboxContent>
                    </ComboBox>
                </div>
            </PopoverContent>
        </Popover>
    );
};
