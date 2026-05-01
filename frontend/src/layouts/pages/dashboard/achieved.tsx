import { format } from "date-fns";
import { CheckCircle2, Calendar, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../lib/api";
import type { Task } from "../../../types";
import { Loader } from "../../../components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

const Achieved = () => {
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => fetchData("/tasks"),
  });

  const completedTasks = tasks.filter((task) => task.status === "Done");

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-green-100 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Achieved Tasks</h1>
          <p className="text-sm text-muted-foreground">
            View all completed tasks across your workspaces
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {completedTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="w-12 h-12 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-600">
                  No completed tasks yet
                </h3>
                <p className="text-sm text-gray-500">
                  Start completing tasks to see them here
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          completedTasks.map((task) => (
            <Card key={task._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      {task.title}
                    </CardTitle>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {task.dueDate && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
                    </div>
                  )}

                  {task.assignees && task.assignees.length > 0 && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{task.assignees.length} assignee(s)</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Summary</h4>
        <p className="text-sm text-blue-800">
          Total Completed: <span className="font-bold">{completedTasks.length}</span> task(s)
        </p>
      </div>
    </div>
  );
};

export default Achieved;
