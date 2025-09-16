import React from 'react'
import Button from '../Actions/Button'

const Form = ({
    label,
    children,
    handleSubmit,
    loading = false,
    extra = "",
    buttonLabel,
    className = "",
    encType = 'application/x-www-form-urlencoded' }) => {

    return (
        <div className={`bg-backgroundC px-6 py-6 rounded-lg border-[1.5px] border-[#788a9a2c] w-full ${className}`}>
            <h2 className="text-3xl font-bold mb-4 text-textC text-center">{label}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 " encType={encType}>
                <div className='space-y-4 py-[8px] px-0.5 bg-backgroundC max-h-[340px] bordr-t border-[#c9c9c98f] overflow-auto customScroll'>
                {children}
                </div>
                <Button type='submit' label={buttonLabel} loading={loading} className='!mt-[20px]' />
                {extra && extra}
            </form>
        </div>
    )
}

export default Form;