import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Filter, Timer } from "lucide-react";
import { LoadingButton } from "./ui/loanding-button";
import { router } from "@inertiajs/react";
import { Input } from "./ui/input";

export default function DatePicker() {
    const [startDate, setStartDate] = React.useState<Date|any>();
    const [endDate, setEndDate] = React.useState<Date|any>();

    return (
        <div className="flex items-center gap-2 ">
            <LoadingButton
                size={"sm"}
                onClick={() => router.visit(route("dashboard"))}
            >
                <Timer className="size-4" />
            </LoadingButton>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <div>
                <LoadingButton
                    disabled={!startDate || !endDate}
                    size={'sm'}
                    onClick={() =>
                        router.get(
                            route("dashboard"),
                            {  endDate: endDate, startDate: startDate },
                        )
                    }
                >
                    <Filter className="size-4" />
                </LoadingButton>
            </div>
        </div>
    );
}
