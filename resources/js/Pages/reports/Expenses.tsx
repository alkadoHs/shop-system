import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ExpenseReport, expenseReportolumns } from "./columns";
import { DataTable } from "@/components/data-table";

const ExpensesReportPage = ({ expenses }: { expenses: ExpenseReport[] }) => {
    return (
        <Authenticated>
            <Head title="Expenses report" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Expenses report</H3>
                </div>

                {/* <div className="my-2.5">
                    <LowStockExport />
                </div> */}

                <DataTable columns={expenseReportolumns} data={expenses} />
            </section>
        </Authenticated>
    );
};

export default ExpensesReportPage;
