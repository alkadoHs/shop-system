import { DataTable } from '@/components/data-table'
import { H3 } from '@/components/ui/heading-with-anchor'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { branch, User } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import { userColumns } from './columns'
import CreateUser from './actions/create-user'

const Index = ({ users, branches }: { users: User[], branches: branch[] }) => {
  return (
    <Authenticated>
        <Head title="Users" />

        <section className='p-4 space-y-2'>
            <H3>Users</H3>

            <div>
                <CreateUser branches={branches} />
            </div>
            <div>
               <DataTable columns={userColumns} data={users} />
            </div>
        </section>
    </Authenticated>
  )
}

export default Index