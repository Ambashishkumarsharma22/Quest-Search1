import React from 'react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
    error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
    <motion.div
        className="text-red-500 text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {error}
    </motion.div>
);

export default ErrorState;