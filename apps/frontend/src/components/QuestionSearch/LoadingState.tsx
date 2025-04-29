import React from 'react';
import { motion } from 'framer-motion';

const LoadingState: React.FC = () => (
    <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="loading"
    >
        {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
                <div className="p-4 border border-outline-variant rounded-lg bg-surface-container">
                    <div className="h-6 bg-surface-container-highest rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-surface-container-highest rounded w-1/4 mb-2"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-surface-container-highest rounded w-1/2"></div>
                        <div className="h-4 bg-surface-container-highest rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
);

export default LoadingState;