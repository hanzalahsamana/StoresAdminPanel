import React, { useState } from 'react'
import Modal from './Modal'
import ActionCard from '../Cards/ActionCard'
import Button from '../Actions/Button'
import FormInput from '../Forms/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '@/APIs/Auth/changePassword'
import { toast } from 'react-toastify'

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { currUser } = useSelector((state) => state.currentUser)

  const validate = () => {
    const newErrors = {}

    if (!newPassword) {
      newErrors.password = 'New Password is required'
    } else if (newPassword.length < 6 || /\s/.test(newPassword)) {
      newErrors.password = 'Password must be at least 6 characters with no spaces'
    }

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    } else if (currentPassword.length < 6 || /\s/.test(currentPassword)) {
      newErrors.currentPassword = 'Password must be at least 6 characters with no spaces'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChangePassword = async () => {
    if (!validate()) return
    if (loading) return

    try {
      setLoading(true)
      const payload = { currentPassword, newPassword }
      await changePassword(currUser?.token, payload)
      toast.success('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setIsOpen(false)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={'max-w-xl'} >
      <ActionCard
        label={'Change Password'}
        actions={<>
          <Button
            label='Cancel'
            variant='white'
            size='small'
            action={() => setIsOpen(false)}
          />
          <Button
            label={loading ? 'Saving...' : 'Change Password'}
            active={!loading}
            variant='black'
            size='small'
            action={handleChangePassword}
          />
        </>}
      >
        <FormInput
          label='Current Password'
          type='password'
          placeholder='Enter your current password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
        />
        <FormInput
          label='New Password'
          type='password'
          placeholder='Enter new password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.password}
        />
      </ActionCard>
    </Modal>
  )
}

export default ChangePasswordModal
