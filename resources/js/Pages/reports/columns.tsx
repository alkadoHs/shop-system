import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../payments/Index";

export interface SalesOverTime {
    id: number;
    date: string;
    total_sales: number;
    total_profit: number;
    avg_sales: number;
    transaction_count: number;
}

export interface SalesByBranch {
    id: number;
    branch_name: string;
    total_sales: number;
    total_profit: number;
    avg_sales: number;
    transaction_count: number;
}

export interface SalesByProduct {
    id: number;
    product_name: string;
    quantity_sold: number;
    total_revenue: number;
    avg_sale_price: number;
    transaction_count: number;
}

export interface deadStock {
    id: number;
    product_name: string;
    last_sale_date: number;
    quantity_sold: number;
    days_since_last_sale: number;
    stock_value: number;
}

export interface LowStock {
    id: number;
    product_name: string;
    stock: number;
    buy_price: number;
}

export interface ExpenseReport {
    id: number;
    user: string;
    payment_method: string;
    items: string;
    total_cost: number;
    created_at: string;
}

export const salesOverTimeColumns: ColumnDef<SalesOverTime>[] = [
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "total_sales",
        header: "Total Sales",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_sales)}</span>;
        },
    },
    {
        accessorKey: "total_profit",
        header: "Total Profit",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_profit)}</span>;
        },
    },
    {
        accessorKey: "avg_sales",
        header: "Average Sales",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.avg_sales)}</span>;
        },
    },
    {
        accessorKey: "transaction_count",
        header: "Transaction Count",
        cell: ({ row }) => {
            return <span>{row.original.transaction_count}</span>;
        },
    },
];

export const branchSalesColumns: ColumnDef<SalesByBranch>[] = [
    {
        accessorKey: "branch_name",
        header: "Branch",
    },
    {
        accessorKey: "total_sales",
        header: "Total Sales",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_sales)}</span>;
        },
    },
    {
        accessorKey: "total_profit",
        header: "Total Profit",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_profit)}</span>;
        },
    },
    {
        accessorKey: "# of transactions",
        header: "Total Transactions",
        cell: ({ row }) => {
            return <span>{row.original.transaction_count}</span>;
        },
    },
    {
        accessorKey: "avg_sales",
        header: "Average Sale/Txn",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.avg_sales)}</span>;
        },
    },
];

export const productSalesColumns: ColumnDef<SalesByProduct>[] = [
    {
        accessorKey: "product_name",
        header: "Product",
    },
    {
        accessorKey: "quantity_sold",
        header: "Quantity Sold",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.quantity_sold)}</span>;
        },
    },
    {
        accessorKey: "total_revenue",
        header: "Total Revenue",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_revenue)}</span>;
        },
    },
    {
        accessorKey: "# of transactions",
        header: "Total Transactions",
        cell: ({ row }) => {
            return <span>{row.original.transaction_count}</span>;
        },
    },
];

export const deadStockColumns: ColumnDef<deadStock>[] = [
    {
        accessorKey: "product_name",
        header: "Product",
    },
    {
        accessorKey: "last_sale_date",
        header: "Last Sale Date",
        cell: ({ row }) => {
            return <span>{row.original.last_sale_date ?? "-"}</span>;
        },
    },
    {
        accessorKey: "quantity_sold",
        header: "Quantity Sold",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.quantity_sold)}</span>;
        },
    },
    {
        accessorKey: "days_since_last_sale",
        header: "Days Since Last Sale",
        cell: ({ row }) => {
            return <span>{row.original.days_since_last_sale ?? "-"}</span>;
        },
    },
    {
        accessorKey: "stock_value",
        header: "Stock Value",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.stock_value)}</span>;
        },
    },
];

export const lowStockColumns: ColumnDef<LowStock>[] = [
    {
        accessorKey: "product_name",
        header: "Product",
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.stock)}</span>;
        },
    },
    {
        accessorKey: "buy_price",
        header: "Buy Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.buy_price)}</span>;
        },
    },
];

export const expenseReportolumns: ColumnDef<ExpenseReport>[] = [
    {
        accessorKey: 'created_at',
        header: 'Date',
    },
    {
        accessorKey: "user",
        header: "User",
    },
    {
        accessorKey: "payment_method",
        header: "Account",
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => {
            return (
                <div className="whitespace-normal">{row.original.items}</div>
            );
        },
    },
    {
        accessorKey: "total_cost",
        header: "Total Cost",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total_cost)}</span>;
        },
    },
];

export interface Account {
    id: number;
    branch_id: number;
    payment_method: Payment;
    amount: number;
    created_at: string;
    updated_at: string;
}

export interface branchAccount {
    id: number;
    name: string;
    accounts: Account[];
    accounts_sum_amount: number;
}

export const accountBalanceColumns: ColumnDef<branchAccount>[] = [
    {
        accessorKey: "name",
        header: "Branch",
    },
    {
        accessorKey: "accounts_sum_amount",
        header: "Total Balance",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.accounts_sum_amount)}</span>;
        },
    },
];

export const accountColumns: ColumnDef<Account>[] = [
    {
        accessorKey: "payment_method",
        header: "Account",
        cell: ({ row }) => {
            return <span>{row.original.payment_method.name}</span>;
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.amount)}</span>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Last Transaction",
        cell: ({ row }) => {
            return <span>{dateTimeFormat(row.original.updated_at)}</span>;
        }
    },
];


export const allAccountsColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'name',
        header: 'Account',
    },
    {
        accessorKey: 'accounts_sum_amount',
        header: 'Total Balance',
        cell: ({ row }) => {
            return (<span>{numberFormat(row.original.accounts_sum_amount)}</span>)
        }
    }
]
