"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";


const Quill = dynamic(() => import("quill"), { ssr: false, loading: () => <p>Loading editor...</p> });

const TextEditor = ({ editorContent, setEditorContent }) => {
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
                        [{ size: ["small", false, "large", "huge"] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }, { background: [] }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ align: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image", "video"],
                        ["clean"],
                    ],
                },
            });

            const quill = quillRef.current;

            if (editorContent) {
                quill.root.innerHTML = editorContent;
            }

            quill.on("text-change", () => {
                const content = quill.root.innerHTML;
                if (content !== editorContent) {
                    setEditorContent(content);
                }
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
        <div className="w-full !border-[1.5px] !border-primaryC">
            <div ref={editorRef} className="max-h-[190px] min-h-[190px] overflow-auto !border-none"></div>
        </div>
    );
};

export default TextEditor;
