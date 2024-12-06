import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { productSalesColumns, SalesByProduct } from "./columns";
import { DataTable } from "@/components/data-table";
import { dateFormat, numberFormat } from "@/lib/utils";
import { TableCell } from "@/components/ui/table";
import ProductSalesFilter from "./filters/ProductSalesFilter";
import { ProductSalesExport } from "./exports/ProductSalesExport";
import ReportDateFilter from "@/components/filters/reports-date-filter";
import { transactionsColumns } from "../dash-columns";
import { OrderItem } from "../credit-sales/columns";
import TimeRangeFilter from "@/components/time-range-filter";

const GeneralSalesReport = ({
    generalSales,
    reportType,
    startDate,
    endDate,
}: {
    generalSales: OrderItem[];
    reportType: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated>
            <Head title="Sales by product" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>General Sales Report</H3>
                </div>

                <div>
                    {reportType != "daily" && (
                        <div className="text-sm text-muted-foreground">
                            DATE:{" "}
                            <span className="text-primary">
                                {dateFormat(startDate)} - {dateFormat(endDate)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="my-3 flex items-center justify-between gap-4">
                    <TimeRangeFilter url="reports.general-sales" type={reportType} />

                    <div className="flex gap-2.5 items-center">
                        <ReportDateFilter
                            url={route("reports.general-sales")}
                        />
                        <ProductSalesExport exportType={reportType} />
                    </div>
                </div>

                <DataTable
                    columns={transactionsColumns}
                    data={generalSales}
                    footer={
                        <>
                            
                        </>
                    }
                />
            </section>
        </Authenticated>
    );
};

export default GeneralSalesReport;
