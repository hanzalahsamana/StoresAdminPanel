
const TemplateLoader = () => {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen z-[100000] backdrop-blur-md bg-[#ffffff] w-full">
            <div className="relative w-10 h-10 animate-spin988">
                <div className="absolute w-4 h-4 bg-gray-800 rounded-full top-0 left-0"></div>
                <div className="absolute w-4 h-4 bg-gray-800 rounded-full top-0 right-0"></div>
                <div className="absolute w-4 h-4 bg-gray-800 rounded-full bottom-0 left-0"></div>
                <div className="absolute w-4 h-4 bg-gray-800 rounded-full bottom-0 right-0"></div>
            </div>
        </div>
    )
}

export default TemplateLoader;