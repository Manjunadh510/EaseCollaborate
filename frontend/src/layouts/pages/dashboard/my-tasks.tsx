import { Loader } from "../../../components/loader";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useGetMyTasksQuery } from "../../../hooks/use-task";
import type { Task } from "../../../types";
import { format } from "date-fns";
import { ArrowUpRight, CheckCircle, Clock, FilterIcon, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const MyTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const initialFilter = searchParams.get("filter") || "all";
  const initialSort = searchParams.get("sort") || "desc";
  const initialSearch = searchParams.get("search") || "";

  const [filter, setFilter] = useState<string>(initialFilter);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSort === "asc" ? "asc" : "desc"
  );
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.filter = filter;
    params.sort = sortDirection;
    params.search = search;

    setSearchParams(params, { replace: true });
  }, [filter, sortDirection, search]);

  useEffect(() => {
    const urlFilter = searchParams.get("filter") || "all";
    const urlSort = searchParams.get("sort") || "desc";
    const urlSearch = searchParams.get("search") || "";

    if (urlFilter !== filter) setFilter(urlFilter);
    if (urlSort !== sortDirection)
      setSortDirection(urlSort === "asc" ? "asc" : "desc");
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: myTasks, isLoading } = useGetMyTasksQuery() as {
    data: Task[];
    isLoading: boolean;
  };

  const filteredTasks =
    myTasks?.length > 0
      ? myTasks
          .filter((task) => {
            if (filter === "all") return true;
            if (filter === "todo") return task.status === "To Do";
            if (filter === "inprogress") return task.status === "In Progress";
            if (filter === "done") return task.status === "Done";
            if (filter === "achieved") return task.isArchived === true;
            if (filter === "high") return task.priority === "High";

            return true;
          })
          .filter(
            (task) =>
              task.title.toLowerCase().includes(search.toLowerCase()) ||
              task.description?.toLowerCase().includes(search.toLowerCase())
          )
      : [];

  //   sort task
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    return 0;
  });

  const todoTasks = sortedTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = sortedTasks.filter((task) => task.status === "Done");

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div
          className="flex flex-col items-start md:flex-row gap-2"
        >
          <Button
            variant={"outline"}
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "Oldest First" : "Newest First"}
          </Button>

          {/* Custom Filter Dropdown */}
          <div className="relative" ref={filterMenuRef}>
            <Button
              variant={"outline"}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <FilterIcon className="w-4 h-4" />
              Filter
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                <div className="px-4 py-2 font-semibold text-sm border-b text-gray-900">
                  Filter Tasks
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setFilter("all");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    All Tasks
                  </button>
                  <button
                    onClick={() => {
                      setFilter("todo");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    To Do
                  </button>
                  <button
                    onClick={() => {
                      setFilter("inprogress");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => {
                      setFilter("done");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setFilter("achieved");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    Achieved
                  </button>
                  <button
                    onClick={() => {
                      setFilter("high");
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    High
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Input
        placeholder="Search tasks ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="board">Board View</TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                {sortedTasks?.length} tasks assigned to you
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {sortedTasks?.map((task) => (
                  <div key={task._id} className="p-4 hover:bg-muted/50 border-b last:border-0">
                    <div className="flex flex-col md:flex-row gap-4 w-full items-start md:items-center">
                      <div className="flex flex-1 min-w-0">
                        <div className="flex gap-2 mr-3 shrink-0 pt-0.5">
                          {task.status === "Done" ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <Clock className="size-4 text-yellow-500" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                            className="font-medium hover:text-primary hover:underline transition-colors flex items-center"
                          >
                            <span className="truncate">{task.title}</span>
                            <ArrowUpRight className="size-4 ml-1 shrink-0" />
                          </Link>
                          <div className="flex items-center space-x-2 mt-2 flex-wrap">
                            <Badge
                              variant={
                                task.status === "Done" ? "default" : "outline"
                              }
                            >
                              {task.status}
                            </Badge>

                            {task.priority && (
                              <Badge
                                variant={
                                  task.priority === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            )}

                            {task.isArchived && (
                              <Badge variant={"outline"}>Archived</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1 w-full md:w-auto">
                        {task.dueDate && (
                          <div>Due: {format(task.dueDate, "PPP")}</div>
                        )}

                        <div>
                          Project:{" "}
                          <span className="font-medium">
                            {task.project.title}
                          </span>
                        </div>

                        <div className="hidden md:block">Modified: {format(task.updatedAt, "PPP")}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {sortedTasks?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board" className="px-0 pt-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  To Do
                  <Badge variant={"outline"}>{todoTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-150 overflow-y-auto">
                {todoTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="p-3 bg-gray-300/20 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-3">
                      <Link
                        to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                        className="block"
                      >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {task.description || "No description "}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(task.dueDate, "PPP")}
                            </span>
                          )}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}

                {todoTasks?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  In Progress
                  <Badge variant={"outline"}>{inProgressTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-150 overflow-y-auto">
                {inProgressTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="p-3 bg-gray-300/20 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-3">
                      <Link
                        to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                        className="block"
                      >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {task.description || "No description "}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(task.dueDate, "PPP")}
                            </span>
                          )}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}

                {inProgressTasks?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Done
                  <Badge variant={"outline"}>{doneTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-150 overflow-y-auto">
                {doneTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="p-3  bg-gray-300/20 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-3">
                      <Link
                        to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                        className="block"
                      >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {task.description || "No description "}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(task.dueDate, "PPP")}
                            </span>
                          )}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}

                {doneTasks?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasks;
