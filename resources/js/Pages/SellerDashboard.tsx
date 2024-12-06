import { DataTable } from "@/components/data-table";
import StatsCard from "@/components/stats-card";
import { H4 } from "@/components/ui/heading-with-anchor";
import { Spinner } from "@/components/ui/spinner";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { numberFormat } from "@/lib/utils";
import { Deferred, Head } from "@inertiajs/react";
import React from "react";
import { transactionsColumns } from "./dash-columns";
import { OrderItem } from "./credit-sales/columns";

interface Props {
    totalPaidSales: number;
    totalCreditSales: number;
    totalExpenses: number;
    totalCreditSalePayments: number;
    totalStockMovements: number;
    transactions: OrderItem[];
}
export default function SellerDashboard({
    totalCreditSalePayments,
    totalCreditSales,
    totalExpenses,
    totalPaidSales,
    totalStockMovements,
    transactions,
}: Props) {
    return (
        <Authenticated>
            <Head title="Seller Dashboard" />

            <section className="p-4 space-y-6">
                <div>
                    <H4>Today Activities</H4>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <Deferred data="totalPaidSales" fallback={<Spinner />}>
                        <StatsCard
                            label="Paid Sales"
                            content={numberFormat(Math.round(totalPaidSales))}
                        />
                    </Deferred>
                    <Deferred data="totalExpenses" fallback={<Spinner />}>
                        <StatsCard
                            label="Expenses"
                            content={numberFormat(Math.round(totalExpenses))}
                        />
                    </Deferred>
                    <Deferred data="totalCreditSales" fallback={<Spinner />}>
                        <StatsCard
                            label="Credit Sales"
                            content={numberFormat(Math.round(totalCreditSales))}
                        />
                    </Deferred>
                    <Deferred
                        data="totalCreditSalePayments"
                        fallback={<Spinner />}
                    >
                        <StatsCard
                            label="Credit Sale Payments"
                            content={numberFormat(
                                Math.round(totalCreditSalePayments)
                            )}
                        />
                    </Deferred>
                    <Deferred data="totalStockMovements" fallback={<Spinner />}>
                        <StatsCard
                            label="Product In/Out"
                            content={numberFormat(
                                Math.round(Number(totalStockMovements))
                            )}
                        />
                    </Deferred>
                    <Deferred
                        data={[
                            "totalPaidSales",
                            "totalCreditSalePayments",
                            "totalExpenses",
                        ]}
                        fallback={<Spinner />}
                    >
                        <StatsCard
                            label="Today Cash"
                            content={numberFormat(
                                Math.round(
                                    Number(totalPaidSales) +
                                        Number(totalCreditSalePayments) -
                                        Number(totalExpenses)
                                )
                            )}
                        />
                    </Deferred>
                </div>

                <div className="space-y-4">
                    <H4>Recent Transactions</H4>
                    <Deferred data="transactions" fallback={<Spinner />}>
                        <DataTable
                            columns={transactionsColumns}
                            data={transactions}
                        />
                    </Deferred>
                </div>
            </section>
        </Authenticated>
    );
}
