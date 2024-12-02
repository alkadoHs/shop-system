import { DataTable } from '@/components/data-table'
import { H3 } from '@/components/ui/heading-with-anchor'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import { ProductCompany, productCompanyColumns } from './columns'
import { CreateProductCompany } from './actions/create-product-company'

const ProductCompanyPage = ({ companies }: { companies: ProductCompany[] }) => {
  return (
    <Authenticated>
        <Head title='Product Companies' />

        <section className="p-4 space-y-4">
            <H3>Product Companies</H3>

            <CreateProductCompany />
            <DataTable columns={productCompanyColumns} data={companies} />
            
        </section>
    </Authenticated>
  )
}

export default ProductCompanyPage