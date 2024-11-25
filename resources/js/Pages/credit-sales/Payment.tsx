import { H3, H4, H5 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    crediSaleOrderItemColumns,
    CreditSale,
    CreditSalePayment,
    creditSalePaymentColumns,
    OrderItem,
} from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import PayOrder from "./actions/pay-order";
import { Payment } from "../payments/Index";
import { Badge } from "@/components/ui/badge";

const CreditPaymentPage = ({
    creditSale,
    creditSalePayments,
    payments,
    items,
}: {
    creditSale: CreditSale;
    creditSalePayments: CreditSalePayment[];
    payments: Payment[];
    items: OrderItem[];
}) => {
    return (
        <Authenticated>
            <Head title={`Credit sale #${creditSale.id}`} />

            <section className="p-4 grid gap-6">
                <div className="">
                    <H3>Credit sale payment #{creditSale.id}</H3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="-mx-4 md:-mx-0">
                        <CardHeader>
                            <CardTitle>OrderSummary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Order No.</TableCell>
                                        <TableCell>#{creditSale.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>
                                            {creditSale.customer.name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>
                                            {creditSale.status == "credit" ? (
                                                <Badge variant={"destructive"}>
                                                    {creditSale.status}
                                                </Badge>
                                            ) : (
                                                <Badge>
                                                    {creditSale.status}
                                                </Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell>
                                            {numberFormat(
                                                creditSale.order_items_sum_total
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Paid</TableCell>
                                        <TableCell className="text-primary">
                                            {numberFormat(
                                                creditSale.credit_salepayments_sum_amount
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Dept</TableCell>
                                        <TableCell className="text-destructive">
                                            {numberFormat(
                                                creditSale.order_items_sum_total -
                                                    creditSale.credit_salepayments_sum_amount
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <PayOrder creditSale={creditSale} payments={payments} />

                    <Card className="-mx-4 md:-mx-0">
                        <CardHeader>
                            <CardTitle>Payment statement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={creditSalePaymentColumns}
                                data={creditSalePayments}
                            />
                        </CardContent>
                    </Card>
                    <Card className="-mx-4 md:-mx-0">
                        <CardHeader>
                            <CardTitle>Products sold</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={crediSaleOrderItemColumns}
                                data={items}
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Authenticated>
    );
};

export default CreditPaymentPage;
