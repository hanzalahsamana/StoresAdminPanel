const BackgroundFrame = ({ children, className }) => {
    return (
        <div className={`w-full p-4 flex flex-col gap-4 justify-center ${className}`}>{children}</div>
    )
}

export default BackgroundFrame