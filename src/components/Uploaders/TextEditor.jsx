"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";


const Quill = dynamic(() => import("quill"), { ssr: false, loading: () => <p>Loading editor...</p> });

const TextEditor = ({ editorContent, setEditorContent, label, className }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensures we're on the client
    }, []);

    useEffect(() => {
        if (!isClient || !editorRef.current) return;

        import("quill").then(({ default: Quill }) => {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        // [{ size: ["small", false, "large", "huge"] }],
                        ["bold", "italic"],
                        [{ color: [] }, { background: [] }],
                        // [{ align: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        // ["clean"],
                    ],
                },
            });

            const quill = quillRef.current;

            if (editorContent) {
                quill.root.innerHTML = editorContent;
            }

            quill.on("text-change", () => {
                let content = quill.root.innerHTML;
                // const plainText = quill.getText().trim();

                // if (plainText === "") {
                //     content = '';
                // }

                // if (content !== editorContent) {
                    setEditorContent(content);
                // }
            }); 
        });

        return () => {
            if (quillRef.current) {
                quillRef.current.off("text-change");
                quillRef.current = null;
            }
        };
    }, [isClient]);

    useEffect(() => {
        if (quillRef.current && editorContent !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = editorContent;
        }
    }, [editorContent]);

    return (
        <div className="">
            {label && (
                <label className="text-[14px] font-medium text-textC mb-1 block">
                    {label}
                </label>
            )}
            <div className={`w-full !border-[1px] !border-[#6b7280] ${className} rounded-2xl overflow-hidden`}>
                <div ref={editorRef} className="max-h-[150px] min-h-[100px] overflow-auto !border-none "></div>
            </div>
        </div>
    );
};

export default TextEditor;
