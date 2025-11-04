'use client';

import './HeroStatement.scss';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';
import { motion } from "framer-motion";

export default function HeroStatement() {

    const handleResumeDownload = () => {
        if (analytics) {
            logEvent(analytics, "resume_downloads");
        }
    };

    return (
        <article className='hero-statement'>
            <div className="hero-statement__title">
                <motion.h1
                    className='hero-statement__heading'
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Hi, I'm Navneel!
                </motion.h1>
                <motion.h3
                    className='hero-statement__subheading'
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
                >
                    Software Engineer | Full-stack Developer
                </motion.h3>
            </div>
            <motion.p
                className='hero-statement__description'
                initial={{ y: 15, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            >
                Building tools that make work easier. I create software that automates tasks, so you can focus on what truly matters.
            </motion.p>
            <motion.a
                href="/resume.pdf"
                className="hero-statement__download"
                download
                onClick={handleResumeDownload}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 1.3, staggerChildren: 0.15 }}
            >
                <motion.button
                    className="hero-statement__resume-btn"
                    variants={{
                        hidden: {
                            x: 150,
                            backgroundColor: "#33353A",
                            filter: "blur(6px)",
                            opacity: 0,
                            borderColor: "#415057",
                        },
                        visible: {
                            x: 0,
                            backgroundColor: "transparent",
                            filter: "blur(0px)",
                            opacity: 1,
                            borderColor: "#415057",
                            transition: {
                                duration: 1.25,
                                ease: "easeOut",
                            },
                        },
                    }}
                    whileTap={{
                        scale: 0.95,
                        y: 0.5,
                    }}
                >
                    <motion.img
                        className="hero-statement__btn-icon"
                        src="/icons/download.svg"
                        width={10}
                        height={15}
                        alt="button icon"
                        variants={{
                            hidden: { opacity: 0, x: -5 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 2 } },
                        }}
                    />
                    <motion.p
                        className="hero-statement__btn-text"
                        variants={{
                            hidden: { opacity: 0, x: 5 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 2.1 } },
                        }}
                    >
                        Resume
                    </motion.p>
                </motion.button>
            </motion.a>
        </article>
    );
}
