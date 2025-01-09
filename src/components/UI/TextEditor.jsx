import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ editorContent, setEditorContent }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null); // To store the Quill instance

    useEffect(() => {
        // Initialize Quill editor only once
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

        quillRef.current = quill; // Store the Quill instance

        // Set initial content if provided
        if (editorContent) {
            quill.root.innerHTML = editorContent;
        }

        // Update state when content changes
        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            setEditorContent(content);
        });

        return () => {
            if (quillRef.current) {
                quillRef.current = null; // Cleanup
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        // Update Quill content only if editorContent changes externally
        if (quillRef.current && editorContent !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = editorContent;
        }
    }, [editorContent]);

    return (
        <div className="w-full">
            <div ref={editorRef} className="max-h-[220px] min-h-[220px] overflow-auto"></div>
        </div>
    );
};

export default TextEditor;
