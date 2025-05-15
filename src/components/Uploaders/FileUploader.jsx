import React from 'react'
import { FiUpload } from 'react-icons/fi'

const FileUploader = ({ accept = ['.json'], file, setFile }) => {

    const handleChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && uploadedFile.type === "application/json") {
            setFile(uploadedFile);
        } else {
            alert("Only JSON files are allowed.");
        }
        e.target.value = "";
    };

    return (
        <div className="flex items-center w-full gap-3">
            <div
                onClick={() => document.getElementById("FileInput").click()}
                className="flex gap-2 px-[15px] py-[7px] transition-all  text-blue-500 hover:text-backgroundC justify-center rounded-sm items-center border border-blue-500 bg-backgroundC hover:bg-blue-500 cursor-pointer">

                <FiUpload className={'text-[15px]'} />
                <p className="text-[12px] ">Upload File</p>

            </div>
            <p className="text-textC opacity-80 text-[16px] ">{file ? file.name : "No file selected"}</p>



            <input
                id="FileInput"
                type="file"
                accept={accept.join(",")}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    )
}

export default FileUploader