import React, { FormEventHandler } from "react";
import { FilterIcon } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { setDate } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loanding-button";

const ReportDateFilter = ({ url }: { url: string }) => {
    const { data, setData, get, processing, reset } = useForm({
        startDate: "",
        endDate: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        get(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <FilterIcon className="size-5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
                <form onSubmit={submit} className="grid gap-2.5">
                    <div className="space-y-1">
                        <Label htmlFor="startDate">From date</Label>
                        <Input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={data.startDate}
                            onChange={(e) =>
                                setData("startDate", e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="endDate">To-date</Label>
                        <Input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={data.endDate}
                            onChange={(e) => setData("endDate", e.target.value)}
                            required
                        />
                    </div>

                    <LoadingButton type="submit" loading={processing}>
                        <FilterIcon className="size-4 mr-1" />
                        Filter
                    </LoadingButton>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default ReportDateFilter;
