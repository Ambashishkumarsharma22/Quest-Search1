import type { ConnectRouter } from "@connectrpc/connect";
import { QuestionService } from "../../proto_gen/connectrpc/questions/v1/questions_pb";
import QuestionServiceImpl from "../services/question.service";

export default (router: ConnectRouter) => {
    router.service(QuestionService, {
        search: async (req) => {
            const result = await QuestionServiceImpl.search({
                query: req.query,
                type: req.type,
                page: req.page,
                limit: req.limit
            });
            return result;
        }
    });
};