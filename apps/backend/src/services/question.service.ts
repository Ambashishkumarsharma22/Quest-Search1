import Question from "../models/question.model";

export default {
    async search(req: { query: string; type?: string, page?: number, limit?: number }) {
        const filter: any = {};

        if (req.query) {
            filter.title = { $regex: req.query, $options: "i" };
        }

        if (req.type && req.type !== "ALL") {
            filter.type = req.type;
        }

        const page = req.page && req.page > 0 ? req.page : 1;
        const limit = req.limit && req.limit > 0 ? req.limit : 10;
        const skip = (page - 1) * limit;

        const totalCount = await Question.countDocuments(filter);

        const questions = await Question.find(filter, { title: 1, type: 1, options: 1, blocks: 1, solution: 1 })
            .skip(skip)
            .limit(limit);

        return {
            totalCount,
            questions: questions.map((q) => ({
                id: q._id.toString(),
                type: q.type,
                title: q.title,
                options: q.type === "MCQ" ? q.options?.map((o) => o.text) : [],
                blocks: q.type === "ANAGRAM" ? q.blocks?.map((b) => b.text) : [],
                solution: q.solution || "",
            })),
        };
    }
};