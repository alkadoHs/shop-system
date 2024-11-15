import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Pos = () => {
  return (
    <Authenticated header={
        <h2>Point of sale</h2>
    }>
        <Head title='Point of sale' />

        <main className='p-4'>
            Point of sale
        </main>
    </Authenticated>
  )
}

export default Pos