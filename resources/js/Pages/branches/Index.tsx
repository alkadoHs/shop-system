import { DataTable } from "@/components/data-table";
import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { branch } from "@/types";
import { Deferred, Head } from "@inertiajs/react";
import { branchColumns } from "./columns";
import { CreateBranch } from "./actions/create-branch";
import { Spinner } from "@/components/ui/spinner";

const BranchPage = ({ branches }: { branches: branch[] }) => {
    return (
        <Authenticated>
            <Head title="Branches" />

            <section className="p-4 space-y-6">
                <H3>Company Branches</H3>

                <div>
                    <CreateBranch />
                </div>
                <Deferred data={"branches"} fallback={<Spinner />}>
                    <DataTable columns={branchColumns} data={branches} />
                </Deferred>
            </section>
        </Authenticated>
    );
};

export default BranchPage;
