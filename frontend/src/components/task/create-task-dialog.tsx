import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useCreateTaskMutation } from "../../hooks/use-task";
import { createTaskSchema } from "../../lib/schema";
import type { ProjectMemberRole, User } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectMembers: { user: User; role: ProjectMemberRole }[];
}

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskDialog = ({
  open,
  onOpenChange,
  projectId,
  projectMembers,
}: CreateTaskDialogProps) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const [expandedDueDate, setExpandedDueDate] = useState(false);
  const [expandedAssignees, setExpandedAssignees] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      assignees: [],
    },
  });

  const { mutate, isPending } = useCreateTaskMutation();

  const onSubmit = (values: CreateTaskFormData) => {
    mutate(
      {
        projectId,
        taskData: values,
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          reset();
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      }
    );
  };

  const selectedAssignees = watch("assignees") || [];
  const dueDate = watch("dueDate");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input 
              {...register("title")} 
              placeholder="Enter task title"
              className="focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Describe the task..."
              rows={2}
              className="resize-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* STATUS + PRIORITY */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(val) => setValue("status", val as any)}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={watch("priority")}
                onValueChange={(val) => setValue("priority", val as any)}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* DUE DATE */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <button
              type="button"
              onClick={() => setExpandedDueDate(!expandedDueDate)}
              className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background hover:bg-accent/50 transition-colors text-sm"
            >
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span className="text-foreground">
                  {dueDate
                    ? format(new Date(dueDate), "MMM dd, yyyy")
                    : "Pick a due date"}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedDueDate ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedDueDate && (
              <div className="p-3 border rounded-md bg-accent/30 animate-in fade-in-50">
                <Calendar
                  mode="single"
                  selected={dueDate ? new Date(dueDate) : undefined}
                  disabled={(date) => date < minDate}
                  onSelect={(date) => {
                    setValue("dueDate", date?.toISOString() || "");
                    setExpandedDueDate(false);
                  }}
                  className="mx-auto"
                />
              </div>
            )}
            {errors.dueDate && (
              <p className="text-xs text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          {/* ASSIGNEES */}
          <div className="space-y-2">
            <Label>Assignees</Label>
            <button
              type="button"
              onClick={() => setExpandedAssignees(!expandedAssignees)}
              className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background hover:bg-accent/50 transition-colors text-sm"
            >
              <span className="text-foreground">
                {selectedAssignees.length === 0
                  ? "Select assignees"
                  : selectedAssignees.length === 1
                  ? "1 assignee selected"
                  : `${selectedAssignees.length} assignees selected`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedAssignees ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedAssignees && (
              <div className="border rounded-md bg-accent/30 p-3 animate-in fade-in-50">
                <ScrollArea className="h-40">
                  <div className="space-y-2 pr-4">
                    {projectMembers.map((member) => {
                      const selected = selectedAssignees.includes(
                        member.user._id
                      );

                      return (
                        <div
                          key={member.user._id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-background/60 transition-colors"
                        >
                          <Checkbox
                            checked={selected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("assignees", [
                                  ...selectedAssignees,
                                  member.user._id,
                                ]);
                              } else {
                                setValue(
                                  "assignees",
                                  selectedAssignees.filter(
                                    (id) => id !== member.user._id
                                  )
                                );
                              }
                            }}
                          />

                          <span className="flex-1 text-sm font-medium truncate">
                            {member.user.name}
                          </span>

                          {selected && (
                            <Check className="w-3 h-3 text-green-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full font-semibold"
            >
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
