import { useMutation } from "@tanstack/react-query";
import { postData } from "../lib/api";

interface SummarizerRequest {
  type: "tasks" | "projects" | "workspace";
  timeRange: "today" | "week" | "month";
  workspaceId?: string;
}

interface SummarizerResponse {
  summary: string;
  keyInsights?: string[];
  recommendations?: string[];
  metadata?: string;
}

export const useAiSummarizer = () => {
  return useMutation({
    mutationFn: (data: SummarizerRequest) =>
      postData<SummarizerResponse>("/ai/summarize", data),
  });
};
