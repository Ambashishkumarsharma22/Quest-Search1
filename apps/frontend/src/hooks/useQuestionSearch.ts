import { useState } from 'react';
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QuestionService } from "../ProtoGen/connectrpc/questions/v1/questions_pb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const client = createClient(QuestionService, transport);

const abort = new AbortController();

export const useQuestionSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [questionType, setQuestionType] = useState("ALL");
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await client.search({
        query: searchQuery,
        type: questionType,
        page,
        limit: 10
      }, { signal: abort.signal });
      setQuestions(response.questions || []);
      setTotalCount(response.totalCount || 0);
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch questions");
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    setQuestions,
    questions,
    error,
    handleSearch,
    page,
    setPage,
    questionType,
    setQuestionType,
    totalCount
  };
};