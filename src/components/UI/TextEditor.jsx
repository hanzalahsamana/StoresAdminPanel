import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
    const editorRef = useRef(null);
    const [editorContent, setEditorContent] = useState('')

    useEffect(() => {
        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ font: [] }],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ header: 1 }, { header: 2 }],
                    [{ align: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    ['blockquote', 'code-block'],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
            },
        });

        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            setEditorContent(content);
            console.log(content , editorRef);

        });

        return () => {
            if (quill && quill.root) {
                quill.root.innerHTML = '';
                // editorRef.current. = null
            }
        };
    }, []);

    return (
        <div className='w-full'>
            <div ref={editorRef} className='max-h-[220px] min-h-[220px]  overflow-auto'></div>
            <button
                onClick={() => {
                    const content = editorRef.current.querySelector('.ql-editor').innerHTML;
                    console.log('Final content:', content);
                }}
            >
                Save
            </button>
        </div>
    );
};

export default TextEditor;
