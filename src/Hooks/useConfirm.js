import Button from '@/components/Actions/Button';
import IconButton from '@/components/Actions/IconButton';
import Modal from '@/components/Modals/Modal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoWarningOutline } from 'react-icons/io5';

export default function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [resolver, setResolver] = useState(null);

  const confirm = (label = 'Please Confirm', text = 'Are you sure?', button1 = 'No, keep it', button2 = 'Yes, delete it') => {
    setMessage({
      label,
      text,
      button1,
      button2,
    });
    setIsOpen(true);
    return new Promise((resolve) => setResolver(() => resolve));
  };

  const handleConfirm = () => {
    resolver(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver(false);
    setIsOpen(false);
  };

  const ConfirmationModal = isOpen
    ? createPortal(
        <>
          <Modal setIsOpen={setIsOpen} isOpen={isOpen} extraFuntion={() => resolver(false)} className={'max-w-md'}>
            <div className="p-4 flex  items-center flex-col w-full">
              <IconButton icon={<IoWarningOutline />} className={'text-red-600 text-[50px] mb-4'} />
              <h1 className="mb-4 font-semibold text-center">{message?.label}</h1>
              <p className="mb-4 text-center">{message?.text}</p>
              <div className="flex justify-end gap-3 mt-4 w-full">
                <Button label={message?.button1} size="small" variant="white" action={handleCancel} />
                <Button label={message?.button2} size="small" variant="danger" action={handleConfirm} />
              </div>
            </div>
          </Modal>
        </>,
        document.body
      )
    : null;

  return { confirm, ConfirmationModal };
}
