import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ExpenseReport, expenseReportolumns } from "./columns";
import { DataTable } from "@/components/data-table";
import ReportDateFilter from "@/components/filters/reports-date-filter";
import { FilterByUser } from "@/components/filters/user-filter";
import { User } from "@/types";

interface Filters {
    start_date: string;
    end_date: string;
    user: User;
}

const ExpensesReportPage = ({ expenses, users, filters }: { expenses: ExpenseReport[], users: User[], filters: Filters }) => {
    return (
        <Authenticated>
            <Head title="Expenses report" />

            <section className="p-4 space-y-4">
                <div className="pb-3">
                    <H3>Expenses report</H3>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        Filters: <span className="text-primary text-xs md:text-lg">{`${filters?.user?.name ?? "-" }, ${filters?.start_date ?? "-"} - ${filters.end_date ?? "-"}`}</span>
                    </div>
                    <div className="flex items-center gap-2.5 justify-end">
                        <FilterByUser users={users} url={route('reports.expenses')} />
                        <ReportDateFilter url={route("reports.expenses")} />
                    </div>
                </div>

                <DataTable columns={expenseReportolumns} data={expenses} />
            </section>
        </Authenticated>
    );
};

export default ExpensesReportPage;
