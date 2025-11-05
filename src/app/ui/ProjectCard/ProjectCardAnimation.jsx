'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCardAnimation({ children }) {
    const cardVariants = {
        hidden: {
            scale: 0.95,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.35,
                delay: 0.25,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 0,
            filter: "blur(6px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.35,
                delay: 0.5,
                ease: "easeOut"  // Smooth circular easing
            }
        }
    };

    const linkElement = React.Children.only(children);
    const linkChildren = React.Children.toArray(linkElement.props.children);

    return (
        <motion.div
            // className="project-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ pointerEvents: 'none' }}
            animate={{ pointerEvents: 'auto' }}
            transition={{ delay: 0.25 }} // Match the animation delay
        >
            {React.cloneElement(linkElement, {},
                linkChildren.map(child => {
                    if (child.props?.className === "project-card__info") {
                        return (
                            <motion.div
                                key="info"
                                variants={textVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {child}
                            </motion.div>
                        );
                    }
                    return child;
                })
            )}
        </motion.div>
    );
}