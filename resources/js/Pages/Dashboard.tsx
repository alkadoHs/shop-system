import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Invoice from "./Invoice";
import { DemoChart } from "./ChartDemo";

export default function Page() {
    return (
        <Authenticated
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-sky-900" />
                    <div className="aspect-video rounded-xl bg-sky-800" />
                    <div className="aspect-video rounded-xl bg-sky-950" />
                </div>
                {/* <Invoice /> */}
                <DemoChart />
            </div>
        </Authenticated>
    );
}
