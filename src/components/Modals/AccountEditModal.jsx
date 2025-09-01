import React from 'react'
import Modal from './Modal'
import ActionCard from '../Cards/ActionCard'
import Button from '../Actions/Button'
import FormInput from '../Forms/FormInput'

const AccountEditModal = ({ isOpen, setIsOpen, editingField = "" }) => { //editingField = fistName , lastName , email , password

    const editingFieldsMap = {
        firstName: {

        },
        lastName: {

        },
        email: {

        },
        password: {
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={'max-w-md'}

        >
            <ActionCard
                label={'Edit First Name'}
                actions={<>
                    <Button
                        label='Cancel'
                        variant='white'
                        size='small'
                        action={()=>setIsOpen(false)}
                    />
                    <Button
                        label='Save'
                        variant='black'
                        size='small'
                        
                    />
                </>}
            >
                <FormInput
                    label='First Name'
                    placeholder={'e.g. Jhon'}
                    suffix={'sxj'}
                />
            </ActionCard>
        </Modal>
    )
}

export default AccountEditModal