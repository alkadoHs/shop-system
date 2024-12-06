import React from "react";
import { PurchaseOrder, purchaseOrderItemColumns } from "./columns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { H3 } from "@/components/ui/heading-with-anchor";
import { DataTable } from "@/components/data-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

const View = ({
    purchaseOrder,
    total,
}: {
    purchaseOrder: PurchaseOrder;
    total: number;
}) => {
    return (
        <Authenticated>
            <Head title={`Purchase Order #${purchaseOrder.id}`} />

            <section className="p-4 space-y-6">
                <H3>Purchase order #{purchaseOrder.id}</H3>

                <div className="border">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Supplier</TableCell>
                                <TableCell>
                                    {purchaseOrder.supplier?.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>
                                    {purchaseOrder.payment_method?.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Branch</TableCell>
                                <TableCell>
                                    {purchaseOrder.branch?.name}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <p className="bg-indigo-950 text-white text-xl pl-4">
                        Purchase order items
                    </p>
                    <DataTable
                        columns={purchaseOrderItemColumns}
                        data={purchaseOrder.purchase_order_items}
                        footer={
                            <>
                                <TableCell>
                                    <b>Total price</b>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <b>{numberFormat(total)}</b>
                                </TableCell>
                            </>
                        }
                    />
                </div>
                <Card>
                  <CardContent className="pt-4">
                    <Button variant={'outline'} onClick={() => router.visit(route('purchases.index'))}>
                      <ArrowLeftCircle className="size-4 mr-2" />
                      Go back</Button>
                  </CardContent>
                </Card>
            </section>
        </Authenticated>
    );
};

export default View;
