import { User } from "@/types";
import { Payment } from "../payments/Index";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormatFilter, numberFormat } from "@/lib/utils";

export interface Expense {
    id: number;
    payment_method: Payment;
    user: User;
}

export interface ExpenseItem {
    id: number;
    expense: Expense;
    item: string;
    cost: number;
    created_at: string;
}

export const expenseItemColumns: ColumnDef<ExpenseItem>[] = [
    {
        accessorKey: "payment_method.name",
        header: "Account",
        cell: ({ row }) => {
            return <span>{row.original.expense.payment_method.name}</span>;
        }
    },
    {
        accessorKey: "item",
        header: "Item",
    },
    {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => {
            return <span>{`Tsh ${numberFormat(row.original.cost)}`}</span>;
        }
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            const date = dateFormatFilter(row.original.created_at);
            return <span>{date}</span>;
        },
    },
];
