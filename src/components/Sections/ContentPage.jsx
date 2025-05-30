import React from 'react'

const ContentPage = ({content}) => {
    return (
        <div className="container max-w-[1500px] py-[50px] px-[3vw] max-[600px]:text-center">
            <h1 className="text-4xl font-bold text-center mb-8">{content?.title}</h1>
            <div className="mx-auto">
                <div className="ql-editor text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content?.text }}>
                </div>
            </div>
        </div>
    )
}

export default ContentPage;
