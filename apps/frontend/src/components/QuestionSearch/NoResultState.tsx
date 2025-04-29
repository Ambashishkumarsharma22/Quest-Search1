import React from 'react';
import { motion } from 'framer-motion';

interface NoResultsStateProps {
    searchQuery: string;
}

const NoResultsState: React.FC<NoResultsStateProps> = ({ searchQuery }) => (
    <motion.div
        className="bg-surface-container rounded-lg border border-outline-variant text-on-surface-variant text-center py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        No questions found for "{searchQuery}"
    </motion.div>
);

export default NoResultsState;