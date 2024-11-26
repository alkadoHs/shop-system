import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { DemoChart } from "./ChartDemo";
import { numberFormat } from "@/lib/utils";
import { Deferred } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import StatsCard from "@/components/stats-card";
import DataCard from "@/components/data-card";
import {
    Blocks,
    ChartBar,
    ChartNoAxesCombined,
    FilePieChart,
    ShieldOff,
} from "lucide-react";
import DatePicker from "@/components/DatePicker";
import StockCard from "@/components/stock-card";
import SalesProfitChart from "./charts/SalesProfitChart";
import SalesExpenseChart from "./charts/SalesExpenseChart";

export default function Page({
    capital,
    totalProducts,
    sales,
    creditSales,
    pendingSales,
    profit,
    creditSalesProfit,
    expenses,
    lowStockProducts,
    expiredProducts,
    zeroStockProducts,
    topSellingProducts,
    salesData,
    profitData,
    expensesData,
    months,
}: {
    capital: number;
    totalProducts: number;
    sales: number;
    creditSales: number;
    pendingSales: number;
    profit: number;
    creditSalesProfit: number;
    expenses: number;
    lowStockProducts: number;
    expiredProducts: number;
    zeroStockProducts: number;
    topSellingProducts: number;
    salesData: number[];
    profitData: number[];
    expensesData: number[];
    months: string[];
}) {
    return (
        <Authenticated
            header={
                <p>Dashboard</p>
            }
        >
            <section className="space-y-6">
                <div className="px-4 flex justify-end items-center gap-4">
                    <DatePicker />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-4  pt-0">
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <Deferred data="capital" fallback={<Spinner />}>
                                <StatsCard
                                    label="Capital"
                                    content={numberFormat(Math.round(capital))}
                                />
                            </Deferred>
                            <Deferred
                                data="totalProducts"
                                fallback={<Spinner />}
                            >
                                <StatsCard
                                    label="Total Stocks"
                                    content={numberFormat(totalProducts)}
                                />
                            </Deferred>
                            <Deferred data="creditSales" fallback={<Spinner />}>
                                <StatsCard
                                    label="Credit Sales"
                                    content={numberFormat(creditSales)}
                                />
                            </Deferred>
                            <Deferred
                                data="pendingSales"
                                fallback={<Spinner />}
                            >
                                <StatsCard
                                    label="Pending Sales"
                                    content={numberFormat(pendingSales)}
                                />
                            </Deferred>
                        </div>
                        <div className="max-w-[85rem] mx-auto">
                            <div className="grid md:grid-cols-4 border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:border-neutral-800">
                                <Deferred data="sales" fallback={<Spinner />}>
                                    <DataCard
                                        title="Paid Sales"
                                        value={numberFormat(sales)}
                                        netValue={numberFormat(
                                            sales - expenses
                                        )}
                                        percentageChange=""
                                        percentageChangeDirection="up"
                                        icon={<FilePieChart />}
                                    />
                                </Deferred>
                                <Deferred data="profit" fallback={<Spinner />}>
                                    <DataCard
                                        title="Profit"
                                        value={numberFormat(profit)}
                                        netValue={numberFormat(
                                            profit - expenses
                                        )}
                                        percentageChange=""
                                        percentageChangeDirection="up"
                                        icon={<ChartBar />}
                                    />
                                </Deferred>
                                <Deferred
                                    data="expenses"
                                    fallback={<Spinner />}
                                >
                                    <DataCard
                                        title="Expenses"
                                        value={numberFormat(expenses)}
                                        netValue={numberFormat(expenses)}
                                        percentageChange=""
                                        percentageChangeDirection="up"
                                        icon={<ChartBar />}
                                    />
                                </Deferred>
                                <Deferred
                                    data="creditSalesProfit"
                                    fallback={<Spinner />}
                                >
                                    <DataCard
                                        title="Credit Sales Profit"
                                        value={numberFormat(creditSalesProfit)}
                                        netValue={numberFormat(
                                            creditSalesProfit
                                        )}
                                        percentageChange=""
                                        percentageChangeDirection="up"
                                        icon={<ChartBar />}
                                    />
                                </Deferred>
                            </div>
                        </div>
                        <div className="max-w-[85rem]">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                <Deferred
                                    data="lowStockProducts"
                                    fallback={<Spinner />}
                                >
                                    <StockCard
                                        title="Out of Stock"
                                        value={numberFormat(lowStockProducts)}
                                        growthRate=""
                                        growthRatePositive={true}
                                        icon={<Blocks />}
                                        link={route('reports.low-stock-alerts')}
                                        linkText="View reports"
                                    />
                                </Deferred>
                                <Deferred
                                    data="topSellingProducts"
                                    fallback={<Spinner />}
                                >
                                    <StockCard
                                        title="Top Selling"
                                        value={numberFormat(topSellingProducts)}
                                        growthRate=""
                                        growthRatePositive={true}
                                        icon={<ChartNoAxesCombined />}
                                        link={route('reports.sales-by-product')}
                                        linkText="View reports"
                                    />
                                </Deferred>
                                <Deferred
                                    data="expiredProducts"
                                    fallback={<Spinner />}
                                >
                                    <StockCard
                                        title="Expired Products"
                                        value={numberFormat(expiredProducts)}
                                        growthRate=""
                                        growthRatePositive={false}
                                        icon={<ShieldOff />}
                                        link="#"
                                        linkText="View reports"
                                    />
                                </Deferred>
                                <Deferred
                                    data="zeroStockProducts"
                                    fallback={<Spinner />}
                                >
                                    <StockCard
                                        title="Zero Stock Products"
                                        value={numberFormat(zeroStockProducts)}
                                        growthRate=""
                                        growthRatePositive={false}
                                        icon={<ShieldOff />}
                                        link="#"
                                        linkText="View reports"
                                    />
                                </Deferred>
                            </div>
                        </div>
                    </div>
                </div>
                <Deferred
                    data={["salesData", "profitData", "months"]}
                    fallback={<Spinner />}
                >
                    <SalesProfitChart
                        salesData={salesData}
                        profitData={profitData}
                        months={months}
                    />
                </Deferred>

                <Deferred
                    data={["expensesData", "salesData", "months"]}
                    fallback={<Spinner />}
                >
                    <SalesExpenseChart
                        salesData={salesData}
                        expensesData={expensesData}
                        months={months}
                    />
                </Deferred>
            </section>
        </Authenticated>
    );
}
