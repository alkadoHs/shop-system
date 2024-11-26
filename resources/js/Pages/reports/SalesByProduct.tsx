import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    branchSalesColumns,
    productSalesColumns,
    SalesByBranch,
    SalesByProduct,
} from "./columns";
import { DataTable } from "@/components/data-table";
import { dateFormat, numberFormat } from "@/lib/utils";
import { TableCell } from "@/components/ui/table";
import BranchSalesFilter from "./filters/BranchSalesFilter";
import { BranchSalesExport } from "./exports/BranchSalesExport";
import ProductSalesFilter from "./filters/ProductSalesFilter";
import { ProductSalesExport } from "./exports/ProductSalesExport";

const SalesByProductPage = ({
    salesByProduct,
    reportType,
    startDate,
    endDate,
}: {
    salesByProduct: SalesByProduct[];
    reportType: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated>
            <Head title="Sales by product" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Sales by Product</H3>
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
                    <ProductSalesFilter type={reportType} />
                    <ProductSalesExport exportType={reportType} />
                </div>

                <DataTable
                    columns={productSalesColumns}
                    data={salesByProduct}
                    footer={
                        <>
                            <TableCell className="left">Total:</TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByProduct.reduce(
                                        (acc, item) =>
                                            acc + Number(item.quantity_sold),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByProduct.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_revenue),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByProduct.reduce(
                                        (acc, item) =>
                                            acc +
                                            Number(item.transaction_count),
                                        0
                                    )
                                )}
                            </TableCell>
                        </>
                    }
                />
            </section>
        </Authenticated>
    );
};

export default SalesByProductPage;
