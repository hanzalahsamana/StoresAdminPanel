import React from 'react'
import { motion } from 'framer-motion';

const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};
const AnimationWrapper = ({ children, className }) => {
    return (
        <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {children}
        </motion.div>
    )
}

export default AnimationWrapper