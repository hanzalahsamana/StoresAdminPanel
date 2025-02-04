import React from 'react'
import Button from '../Actions/Button'

const Form = ({ lable, children, handleSubmit, loading = false, extra = "" }) => {
    return (
        <div className="bg-backgroundC px-6 py-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-textC text-center">{lable}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {children}

                <Button type='submit' label='Sign Up' loading={loading} />
                {extra && extra}

            </form>
        </div>
    )
}

export default Form;