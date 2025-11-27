'use client'
import * as motion from 'motion/react-client'
import './Loader.scss'

export default function CyberpunkLoader() {
    return (
        <motion.div
            className="loader-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="loader"></div>
        </motion.div>
    )
} 
