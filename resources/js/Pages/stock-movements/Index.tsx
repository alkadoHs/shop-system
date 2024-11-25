import { H2, H3 } from '@/components/ui/heading-with-anchor'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { stockMovementColumns, StockMovements } from './columns'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import CreateStockvement from './Actions/create-stock-movement'
import { Products } from '../products/Index'

const StockMovement = ({ stockMovements, products }: { stockMovements: StockMovements, products: Products }) => {
  return (
    <Authenticated>
        <Head title='Stock Movements' />

        <section className='p-4'>
           <div className='mb-2'>
             <H3>Stock Movements</H3>
           </div>

           <div className='flex items-center justify-between gap-4 bg-card p-4 rounded-md my-2'>
             <Input type='search' className='max-w-sm' placeholder='Search by name' />

             <CreateStockvement products={products} />
           </div>

          <DataTable columns={stockMovementColumns} data={stockMovements.data} />
        </section>
    </Authenticated>
  )
}

export default StockMovement