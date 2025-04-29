import React from 'react';
import { motion } from 'framer-motion';
import ExpandableSection from './ExpandableSection';

interface Question {
    id: string;
    title: string;
    type: string;
    options?: string[];
    blocks?: string[];
    solution?: string;
}

interface QuestionListProps {
    questions: Question[];
    openItems: Record<string, boolean>;
    setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, openItems, setOpenItems }) => (
    <motion.ul
        className="space-y-2"
        key="results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {questions.map((question) => (
            <motion.li
                key={question.id}
                className="p-4 rounded-lg hover:shadow-lg bg-surface-container text-on-surface"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
            >
                <h2 className="text-lg font-semibold">{question.title}</h2>
                <span className="inline-block bg-tertiary text-on-tertiary border border-outline text-xs px-2 py-1 rounded-full mt-2">
                    {question.type}
                </span>
                {question.type === "MCQ" && question.options && (
                    <ExpandableSection
                        label="Options"
                        isOpen={openItems[`${question.id}-mcq`]}
                        onToggle={() =>
                            setOpenItems((prev) => ({
                                ...prev,
                                [`${question.id}-mcq`]: !prev[`${question.id}-mcq`],
                            }))
                        }
                    >
                        {question.options.map((option, idx) => (
                            <motion.li
                                key={idx}
                                className={`${question.solution === option ? 'bg-green-200' : 'bg-surface-dim'} text-on-surface px-4 py-1 rounded-full text-center text-sm font-mono`}
                                variants={{
                                    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                                    collapsed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
                                }}
                            >
                                {option}
                            </motion.li>
                        ))}
                    </ExpandableSection>
                )}
                {question.type === "ANAGRAM" && question.blocks && (
                    <ExpandableSection
                        label="Blocks"
                        isOpen={openItems[`${question.id}-anagram`]}
                        onToggle={() =>
                            setOpenItems((prev) => ({
                                ...prev,
                                [`${question.id}-anagram`]: !prev[`${question.id}-anagram`],
                            }))
                        }
                    >
                        {question.blocks.map((block, idx) => (
                            <motion.li
                                key={idx}
                                className="bg-surface-dim px-4 py-1 rounded-full text-center text-sm font-mono"
                                variants={{
                                    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                                    collapsed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
                                }}
                            >
                                {block}
                            </motion.li>
                        ))}
                    </ExpandableSection>
                )}
            </motion.li>
        ))}
    </motion.ul>
);

export default QuestionList;