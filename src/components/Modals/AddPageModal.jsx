import { createPage } from '@/APIs/Pages/Page';
import { generateSlug } from '@/Utils/GenerateSlug';
import React, { useState } from 'react';
import Modal from './Modal';
import ActionCard from '../Cards/ActionCard';
import Button from '../Actions/Button';
import FormInput from '../Forms/FormInput';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToggleSwitch from '../Actions/ToggleSwitch';

const AddPageModal = ({ isOpen, setIsOpen }) => {
    const { currUser } = useSelector((state) => state.currentUser);
    const { store } = useSelector((state) => state.store);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', slug: '', isHeaderFooter: true });
    const [errors, setErrors] = useState({});

    const handleAddPage = async () => {
        let newErrors = {};

        if (!formData?.name?.trim()) {
            newErrors.name = 'Page Name is required.';
        }
        if (!formData?.slug?.trim()) {
            newErrors.slug = 'Path Name is required.';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData?.name.trim(),
                slug: generateSlug(formData?.slug),
                isHeaderFooter: formData?.isHeaderFooter || true,
            };
            await createPage(currUser?.token, store?._id, payload);
            Onclose()
            setIsOpen(false)
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message)
        } finally {
            setLoading(false);
        }
    };

    const Onclose = () => {
        setErrors(null)
        setFormData({})
        setLoading(false)
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} extraFuntion={Onclose} className='max-w-md'>
            <ActionCard
                label='Create Page'
                actionPosition='bottom'
                actions={
                    <>
                        <Button
                            label='Cancel'
                            variant='white'
                            size='small'
                            action={() => { setIsOpen(false); Onclose(); }}
                        />
                        <Button
                            label={'Done'}
                            variant='black'
                            size='small'
                            action={handleAddPage}
                            loading={loading}
                        />
                    </>
                }
            >
                <FormInput
                    name='name'
                    value={formData?.name}
                    onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors?.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder='e.g. About Us'
                    label='Page Name'
                    error={errors?.name}
                />

                <FormInput
                    name='slug'
                    value={formData?.slug}
                    onChange={(e) => {
                        const newSlug = generateSlug(e.target.value);
                        setFormData({ ...formData, slug: newSlug });
                        if (errors?.slug) setErrors({ ...errors, slug: '' });
                    }}
                    label='Path Name'
                    placeholder='e.g. about-us'
                    error={errors?.slug}
                    prefix={'/pages/'}
                />
                <ToggleSwitch
                    label='Does you want Header and footer on this page?'
                    checked={formData?.isHeaderFooter}
                    setChecked={(value) => { setFormData({ ...formData, isHeaderFooter: value }) }}
                />
            </ActionCard>
        </Modal>
    );
};

export default AddPageModal;
