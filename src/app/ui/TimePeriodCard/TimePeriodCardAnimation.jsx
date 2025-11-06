'use client';

import { motion } from 'framer-motion';

const cardVariants = {
    hidden: position => ({
        opacity: 0,
        x: position === 'left' ? -50 : 50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 35,
            damping: 25,
            duration: 1.5,
            delay: 0.5
        }
    }
};

export default function TimePeriodCardAnimation({ children, position }) {
    return (
        <motion.div
            className={`time-period time-period--${position}`}
            variants={cardVariants}
            custom={position}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}