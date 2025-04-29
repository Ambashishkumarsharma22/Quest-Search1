import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PaginationControls: React.FC<{
    page: number;
    totalCount: number;
    paginationLoading: boolean;
    onPrevious: () => void;
    onNext: () => void;
}> = ({ page, totalCount, paginationLoading, onPrevious, onNext }) => (
    <motion.div
        className="flex justify-between mt-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.button
            onClick={onPrevious}
            disabled={page === 1 || paginationLoading}
            className="px-4 py-2 bg-secondary text-on-secondary disabled:bg-surface-container-highest rounded-full transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {paginationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Previous
        </motion.button>
        <span className="flex items-center bg-primary-container text-on-primary-container px-4 py-1 rounded-full">
            Page {page} of {Math.ceil(totalCount / 10)}
        </span>
        <motion.button
            onClick={onNext}
            disabled={paginationLoading || page >= Math.ceil(totalCount / 10)}
            className="px-4 py-2 bg-secondary text-on-secondary transition-colors flex items-center gap-2 disabled:bg-surface-container-highest rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Next
            {paginationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        </motion.button>
    </motion.div>
);

export default PaginationControls;