"use client";

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ editorContent, setEditorContent }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null); 

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure client-side execution

        if (!editorRef.current) return;

        quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: [
                    [{ font: [] }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ script: "sub" }, { script: "super" }],
                    [{ header: 1 }, { header: 2 }],
                    [{ align: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["blockquote", "code-block"],
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

        return () => {
            if (quillRef.current) {
                quillRef.current.off("text-change"); // Remove event listener
                quillRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (quillRef.current && editorContent !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = editorContent;
        }
    }, [editorContent]);

    return (
        <div className="w-full">
            <div ref={editorRef} className="max-h-[190px] min-h-[190px] overflow-auto"></div>
        </div>
    );
};

export default TextEditor;
