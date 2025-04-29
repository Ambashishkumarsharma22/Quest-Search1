import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const ExpandableSection: React.FC<{
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}> = ({ label, isOpen, onToggle, children }) => (
    <div className="mt-2">
        <motion.div
            className="cursor-pointer bg-secondary w-fit px-3 py-[2px] rounded-full transition-colors flex items-center gap-2 text-sm select-none text-on-secondary"
            onClick={onToggle}
        >
            <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="inline-block"
            >
                <Plus height={15} width={15} />
            </motion.span>
            {label}
        </motion.div>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.2 },
                        },
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.2 },
                        },
                    }}
                >
                    <div className="overflow-hidden">
                        <motion.ul
                            className="px-2 py-2 mt-2 space-y-2 bg-surface rounded-lg"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                                collapsed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                            }}
                        >
                            {children}
                        </motion.ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default ExpandableSection;