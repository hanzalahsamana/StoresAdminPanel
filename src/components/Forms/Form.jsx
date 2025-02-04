import React from 'react'
import Button from '../Actions/Button'

const Form = ({
    lable,
    children,
    handleSubmit,
    loading = false,
    extra = "",
    buttonLabel,
    className = "",
    encType = 'application/x-www-form-urlencoded' }) => {

    return (
        <div className={`bg-backgroundC px-6 py-8 rounded-lg shadow-lg w-full ${className}`}>
            <h2 className="text-3xl font-bold mb-6 text-textC text-center">{lable}</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType={encType}>
                <div className='space-y-4 p-[8px] bg-backgroundC max-h-[300px] overflow-auto customScroll'>
                {children}
                </div>
                <Button type='submit' label={buttonLabel} loading={loading} className='!mt-[20px]' />
                {extra && extra}
            </form>
        </div>
    )
}

export default Form;