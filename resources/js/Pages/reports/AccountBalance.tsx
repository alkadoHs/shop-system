import { DataTable } from "@/components/data-table";
import { H3, H4 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { Fragment } from "react";
import {
    accountBalanceColumns,
    accountColumns,
    allAccountsColumns,
    branchAccount,
} from "./columns";
import { numberFormat } from "@/lib/utils";
import { Payment } from "../payments/Index";

const AccountBalance = ({
    branchAccounts,
    allAccounts,
}: {
    branchAccounts: branchAccount[];
    allAccounts: Payment[];
}) => {
    return (
        <Authenticated>
            <Head title="Account balances" />

            <section className="p-4 space-y-2">
                <H3>Account Balances</H3>

                <div className="max-w-[85rem] lg:px-8 mx-auto space-y-4">
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {branchAccounts.map((branchAccount) => (
                            <div
                                className="space-y-3  p-4  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
                                key={branchAccount.id}
                            >
                                <div className="flex flex-col gap-y-3 lg:gap-y-5  md:p-5">
                                    <div className="inline-flex justify-center items-center">
                                        <span className="size-2 inline-block bg-gray-500 rounded-full me-2"></span>
                                        <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                                            {branchAccount.name}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200">
                                            {numberFormat(
                                                branchAccount.accounts_sum_amount
                                            )}
                                        </h3>
                                    </div>
                                    <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800">
                                        {branchAccount.accounts_sum_amount >
                                        0 ? (
                                            <Fragment>
                                                <dt className="pe-3">
                                                    <span className="text-green-600">
                                                        <svg
                                                            className="inline-block size-4 self-center"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                                                            />
                                                        </svg>
                                                        <span className="inline-block text-sm">
                                                            Active
                                                        </span>
                                                    </span>
                                                </dt>
                                                <dd className="text-start ps-3">
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                                        Balance available
                                                    </span>
                                                    <span className="h-6 w--6 animate-pulse bg-green-500"></span>
                                                </dd>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <dt className="pe-3">
                                                    <span className="text-red-600">
                                                        <svg
                                                            className="inline-block size-4 self-center"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                                                            />
                                                        </svg>
                                                        <span className="inline-block text-sm">
                                                            Low
                                                        </span>
                                                    </span>
                                                    <span className="block text-sm text-gray-500 dark:text-neutral-500"></span>
                                                </dt>
                                                <dd className="text-start ps-3">
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200"></span>
                                                    <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                                        Low balance
                                                    </span>
                                                </dd>
                                            </Fragment>
                                        )}
                                    </dl>
                                </div>

                                <DataTable
                                    data={branchAccount.accounts}
                                    columns={accountColumns}
                                />
                            </div>
                        ))}
                    </div>

                    <H4>General Balance</H4>
                    <DataTable
                        data={allAccounts}
                        columns={allAccountsColumns}
                    />
                </div>
            </section>
        </Authenticated>
    );
};

export default AccountBalance;
