import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CreatePayment } from "./actions/create-payment";
import DeletePayment from "./actions/delete-payment";
import { Card } from "@/components/ui/card";

export interface Payment {
    id: number;
    name: string;
    number: string;
}

const Payments = ({ payments }: { payments: Payment[] }) => {
    return (
        <Authenticated header={<h2>Payment methods</h2>}>
            <Head title="Payment methods" />

            <Card className="p-4">
                <div className="flex justify-between gap-4 mb-4 items-center">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Payment Metthods
                  </h3>
                  <CreatePayment />
                </div>

                <Card className="overflow-x-auto whitespace-nowrap">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>NAME</TableHead>
                                <TableHead>NUMBER</TableHead>
                                <TableHead>ACTION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment, index) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{payment.name}</TableCell>
                                    <TableCell>{payment.number ? payment.number: '00-000'}</TableCell>
                                    <TableCell>
                                        <DeletePayment payment={payment} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Card>
        </Authenticated>
    );
};

export default Payments;
