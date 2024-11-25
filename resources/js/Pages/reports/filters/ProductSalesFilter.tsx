import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router } from "@inertiajs/react";
import React from "react";

const ProductSalesFilter = ({ type }: { type?: string }) => {
    const [reportType, setReportType] = React.useState(type ?? "monthly");

    return (
        <div className="w-full">
            <Select
                value={reportType}
                onValueChange={(value) => {
                    setReportType(value);

                    router.get(
                        route("reports.sales-by-product", { reportType: value }),
                        {},
                        { preserveState: true, replace: true }
                    );
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select " />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key="daily" value="daily">
                        Today{" "}
                    </SelectItem>
                    <SelectItem key="this-week" value="weekly">
                        This week
                    </SelectItem>
                    <SelectItem key="this-month" value="monthly">
                        This month
                    </SelectItem>
                    <SelectItem key="this-year" value="yearly">
                        This year
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProductSalesFilter;
