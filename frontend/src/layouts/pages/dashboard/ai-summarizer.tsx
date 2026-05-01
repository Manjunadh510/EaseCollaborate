import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../../components/loader";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useAiSummarizer } from "../../../hooks/use-ai-summarizer";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type SummaryType = "tasks" | "projects" | "workspace";
type TimeRange = "today" | "week" | "month";

const AISummarizer = () => {
  const [searchParams] = useSearchParams();
  const [summaryType, setSummaryType] = useState<SummaryType>("tasks");
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  const workspaceId = searchParams.get("workspaceId");

  const { mutate: generateSummary, isPending, data: summary } = useAiSummarizer();

  const handleGenerateSummary = () => {
    if (!workspaceId && summaryType !== "tasks") {
      toast.error("Please select a workspace first");
      return;
    }

    generateSummary(
      {
        type: summaryType,
        timeRange,
        workspaceId: workspaceId || undefined,
      },
      {
        onError: (error: any) => {
          const errorMsg =
            error.response?.data?.message ||
            error.message ||
            "Failed to generate summary";
          toast.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            AI Summarizer
          </h1>
          <p className="text-muted-foreground mt-2">
            Get AI-powered insights about your tasks and productivity
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Summary</CardTitle>
          <CardDescription>Select what you want to summarize</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Summary Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Summary Type</label>
              <Select value={summaryType} onValueChange={(value) => setSummaryType(value as SummaryType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tasks">My Tasks</SelectItem>
                  {/* <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="workspace">Workspace</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* Time Range Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerateSummary}
            disabled={isPending}
            className="w-full"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Generating Summary...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Summary Display */}
      {isPending && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader />
            <p className="text-muted-foreground mt-4">
              AI is analyzing your {summaryType === "tasks" ? "tasks" : summaryType === "projects" ? "projects" : "workspace"}...
            </p>
          </CardContent>
        </Card>
      )}

      {summary && !isPending && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Summary Results
            </CardTitle>
            <CardDescription>
              Generated for {summaryType === "tasks" ? "your tasks" : summaryType === "projects" ? "projects" : "workspace"} ({timeRange})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary Content */}
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-base leading-relaxed">
                  {summary.summary}
                </p>
              </div>
            </div>

            {/* Key Insights if available */}
            {summary.keyInsights && summary.keyInsights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Key Insights:</h3>
                <ul className="space-y-2">
                  {summary.keyInsights.map((insight: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-yellow-500 font-bold">✨</span>
                      <span className="text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations if available */}
            {summary.recommendations && summary.recommendations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Recommendations:</h3>
                <ul className="space-y-2">
                  {summary.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-blue-500 font-bold">💡</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metadata */}
            {summary.metadata && (
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  {summary.metadata}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISummarizer;
