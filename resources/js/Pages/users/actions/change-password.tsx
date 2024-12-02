import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from '@/components/ui/responsoive-model'
import { User } from '@/types'
import { Key } from 'lucide-react'
import React from 'react'

const ChangePassword = ({ user }: { user: User }) => {
  return (
    <ResponsiveModalClose>
        <ResponsiveModalTrigger>
            <Button variant={'outline'} size={'icon'}>
                <Key />
            </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent>
            <ResponsiveModalHeader>
                <ResponsiveModalTitle>Change {user.name}'s password</ResponsiveModalTitle>
            </ResponsiveModalHeader>

            <form className='my-10'>
                <div>
                    <Label htmlFor='password'>Password</Label>
                </div>
            </form>
        </ResponsiveModalContent>
    </ResponsiveModalClose>
  )
}

export default ChangePassword