import React, { useState } from 'react'
import Modal from './Modal'
import ActionCard from '../Cards/ActionCard'
import Button from '../Actions/Button'
import FormInput from '../Forms/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '@/APIs/Auth/deleteAccount'
import { setLogout } from '@/Redux/Authentication/AuthSlice'
import { toast } from 'react-toastify'

const DeleteAccountModal = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { currUser } = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      toast.error('Please enter your password.')
      return
    }
    if (loading) return

    try {
      setLoading(true)
      await deleteAccount(currUser?.token, { password })
      toast.success('Account deleted successfully.')
      dispatch(setLogout())
      setIsOpen(false)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={'max-w-xl'}
    >
      <ActionCard
        label={'Delete Account'}
        actions={<>
          <Button
            label='Cancel'
            variant='white'
            size='small'
            action={() => setIsOpen(false)}
          />
          <Button
            label={loading ? 'Deleting...' : 'Delete Account'}
            variant='danger'
            size='small'
            action={handleDeleteAccount}
            active={!loading}
          />
        </>}
      >
        <p className='text-yellow-600 bg-yellow-500/20 p-2 text-sm mb-3 font-medium'>
          Warning: This will delete all your data, including stores, personal information, and other associated records. Please enter your password to confirm account deletion.
        </p>
        <FormInput
          label='Current Password'
          type='password'
          placeholder='Enter your password'
          value={password}
          size='small'
          onChange={(e) => setPassword(e.target.value)}
        />
      </ActionCard>
    </Modal>
  )
}

export default DeleteAccountModal
