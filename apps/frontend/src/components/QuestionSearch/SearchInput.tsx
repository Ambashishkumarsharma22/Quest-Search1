import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setIsFocused: (focused: boolean) => void;
    handleBackClick: () => void;
    isFocused: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
    searchQuery,
    setSearchQuery,
    setIsFocused,
    handleBackClick,
    isFocused,
}) => (
    <div className='flex mb-4 w-full'>
        <motion.button
            onClick={handleBackClick}
            className="pl-2 rounded-tl-full rounded-bl-full bg-secondary-container text-on-secondary-container h-[42px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <AnimatePresence mode="wait">
                {isFocused ? (
                    <motion.div
                        key="arrow"
                        className='hover:bg-accent rounded-full p-1'
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowLeft height={18} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="search"
                        className='hover:bg-accent rounded-full p-1'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Search height={18} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
        <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full p-2 focus:outline-none bg-secondary-container rounded-tr-full rounded-br-full h-[42px] text-on-secondary-container font-medium"
        />
    </div>
);

export default SearchInput;