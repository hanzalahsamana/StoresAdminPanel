'use client';

import { motion, AnimatePresence } from 'framer-motion';

const BlurLoader = ({ isVisible = true }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 flex items-center justify-center h-screen z-[100000] bg-[#ffffff] w-full"
                >
                    {/* Add= optional loader content here */}
                    <div className="flex flex-col items-center gap-5">

                        <div className="relative w-10 h-10 animate-spin988">
                            <div className="absolute w-4 h-4 bg-gray-800 rounded-full top-0 left-0"></div>
                            <div className="absolute w-4 h-4 bg-gray-800 rounded-full top-0 right-0"></div>
                            <div className="absolute w-4 h-4 bg-gray-800 rounded-full bottom-0 left-0"></div>
                            <div className="absolute w-4 h-4 bg-gray-800 rounded-full bottom-0 right-0"></div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlurLoader;
