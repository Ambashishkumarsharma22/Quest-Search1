import React, { useEffect, useState } from 'react';
import { useQuestionSearch } from '../hooks/useQuestionSearch';
import { AnimatePresence, motion } from 'framer-motion';
import SearchInput from '../components/QuestionSearch/SearchInput';
import QuestionList from '../components/QuestionSearch/QuestionList';
import PaginationControls from '../components/QuestionSearch/PaginationControls';
import LoadingState from '../components/QuestionSearch/LoadingState';
import ErrorState from '../components/QuestionSearch/ErrorState';
import NoResultsState from '../components/QuestionSearch/NoResultState';
import { containerVariants, contentVariants } from '../utils/variant';
import { BookOpenText } from 'lucide-react';

const QuestionSearch: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    questions,
    setQuestions,
    handleSearch,
    page,
    setPage,
    questionType,
    setQuestionType,
    totalCount,
  } = useQuestionSearch();

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      if (isFocused && searchQuery.trim()) {
        setLoading(true);
        setError(null);
        try {
          await handleSearch();
        } catch (error) {
          if (isActive) {
            setError('Failed to fetch questions. Please try again.');
          }
          console.error('Search error:', error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      }
    };

    if (page !== 1) {
      fetchData();
    } else {
      const debounceTimer = setTimeout(fetchData, 700);
      return () => {
        isActive = false;
        clearTimeout(debounceTimer);
      };
    }
  }, [searchQuery, questionType, isFocused, page]);

  const handleChipClick = (type: string) => {
    setQuestionType(type === questionType ? "" : type);
    setPage(1);
  };

  const questionTypes = ["ALL", "MCQ", "ANAGRAM", "READ_ALONG", "CONTENT_ONLY"];

  return (
    <div className="min-h-dvh flex items-start justify-center">
      <motion.div
        className="w-3xl max-w-3xl mx-auto p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center"
          variants={contentVariants}
          animate={isFocused ? "top" : "centered"}
        >
          <div className='w-full flex flex-col items-center bg-surface-container px-4 pt-4 rounded-lg mb-5'>
            <motion.h1
              className="text-2xl font-medium font-atkinson mb-8 cursor-default"
              animate={{
                opacity: isFocused ? 0.8 : 1,
                scale: isFocused ? 0.9 : 1,
                transition: { duration: 0.3 },
              }}
            >
              <div className='flex items-center gap-x-1'>
                <div className='bg-primary p-2 rounded-full text-on-primary'><BookOpenText height={20} width={20} /></div>
                <p className='bg-primary text-on-primary px-4 py-[2px] rounded-full'>QuestSearch</p>
              </div>
            </motion.h1>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsFocused={setIsFocused}
              handleBackClick={() => {
                setIsFocused(false);
                setQuestions([]);
                setSearchQuery('');
              }}
              isFocused={isFocused}
            />
            <motion.div
              className="w-full overflow-hidden flex justify-center"
              animate={{
                height: isFocused ? "auto" : 0,
                marginBottom: isFocused ? "1rem" : 0,
                opacity: isFocused ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2 bg-surface px-3 py-2 rounded-lg border border-outline-variant">
                {questionTypes.map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => handleChipClick(type)}
                    className={`px-4 py-2 rounded-full text-xs ${questionType === type ? "bg-primary text-on-primary" : "bg-secondary-container  text-on-secondary-container"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            className="w-full"
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState error={error} />
              ) : questions.length === 0 && searchQuery.trim() ? (
                <NoResultsState searchQuery={searchQuery} />
              ) : (
                <QuestionList
                  questions={questions}
                  openItems={openItems}
                  setOpenItems={setOpenItems}
                />
              )}
            </AnimatePresence>
            {isFocused && questions.length > 0 && (
              <PaginationControls
                page={page}
                totalCount={totalCount}
                onPrevious={() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                }
                }
                onNext={() => {
                  setPage((prev) => prev + 1);
                }} paginationLoading={false} />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuestionSearch;