import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const StockMovements = () => {
  return (
    <Authenticated>
        <Head title='Stock Movements' />

        <div>StockMovements</div>
    </Authenticated>
  )
}

export default StockMovements