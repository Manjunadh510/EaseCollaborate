import { projectSchema } from "../../lib/schema";
import { ProjectStatus, type MemberProps } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Check } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { UseCreateProject } from "../../hooks/use-project";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface CreateProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  workspaceMembers: MemberProps[];
}

export type CreateProjectFormData = z.infer<typeof projectSchema>;

export const CreateProjectDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceMembers,
}: CreateProjectDialogProps) => {
  const [expandedStartDate, setExpandedStartDate] = useState(false);
  const [expandedDueDate, setExpandedDueDate] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: ProjectStatus.PLANNING,
      startDate: "",
      dueDate: "",
      members: [],
      tags: undefined,
    },
  });

  const { mutate, isPending } = UseCreateProject();

  const onSubmit = (values: CreateProjectFormData) => {
    if (!workspaceId) return;

    mutate(
      {
        projectData: values,
        workspaceId,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          reset();
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      }
    );
  };

  const selectedMembers = watch("members") || [];
  const startDate = watch("startDate");
  const dueDate = watch("dueDate");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Project Title</Label>
            <Input 
              {...register("title")} 
              placeholder="Enter project title" 
              className="focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Project Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Describe your project..."
              rows={2}
              className="resize-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <Label>Project Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(val) => setValue("status", val as any)}
            >
              <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select Project Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProjectStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* START DATE */}
          <div className="space-y-2">
            <Label>Start Date</Label>
            <button
              type="button"
              onClick={() => setExpandedStartDate(!expandedStartDate)}
              className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background hover:bg-accent/50 transition-colors text-sm"
            >
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span className="text-foreground">
                  {startDate
                    ? format(new Date(startDate), "MMM dd, yyyy")
                    : "Pick a start date"}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedStartDate ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedStartDate && (
              <div className="p-3 border rounded-md bg-accent/30 animate-in fade-in-50">
                <Calendar
                  mode="single"
                  selected={startDate ? new Date(startDate) : undefined}
                  onSelect={(date) => {
                    setValue("startDate", date?.toISOString() || "");
                    setExpandedStartDate(false);
                  }}
                  className="mx-auto"
                />
              </div>
            )}
            {errors.startDate && (
              <p className="text-xs text-red-500">{errors.startDate.message}</p>
            )}
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
                  disabled={(date) =>
                    !!startDate && date < new Date(new Date(startDate).setHours(0, 0, 0, 0))
                  }
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

          {/* TAGS */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              {...register("tags")}
              placeholder="Separated by comma (e.g. frontend, urgent)"
              className="focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          {/* MEMBERS */}
          <div className="space-y-2">
            <Label>Team Members</Label>
            <button
              type="button"
              onClick={() => setExpandedMembers(!expandedMembers)}
              className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background hover:bg-accent/50 transition-colors text-sm"
            >
              <span className="text-foreground">
                {selectedMembers.length === 0
                  ? "Select members"
                  : selectedMembers.length === 1
                  ? "1 member selected"
                  : `${selectedMembers.length} members selected`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedMembers ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedMembers && (
              <div className="border rounded-md bg-accent/30 p-3 animate-in fade-in-50">
                <ScrollArea className="h-40">
                  <div className="space-y-2 pr-4">
                    {workspaceMembers.map((member) => {
                      const selected = selectedMembers.find(
                        (m) => m.user === member.user._id
                      );

                      return (
                        <div
                          key={member._id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-background/60 transition-colors"
                        >
                          <Checkbox
                            checked={!!selected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("members", [
                                  ...selectedMembers,
                                  {
                                    user: member.user._id,
                                    role: "contributor",
                                  },
                                ]);
                              } else {
                                setValue(
                                  "members",
                                  selectedMembers.filter(
                                    (m) => m.user !== member.user._id
                                  )
                                );
                              }
                            }}
                          />

                          <span className="flex-1 text-sm font-medium truncate">
                            {member.user.name}
                          </span>

                          {selected && (
                            <div className="flex items-center gap-1">
                              <Select
                                value={selected.role}
                                onValueChange={(role) => {
                                  setValue(
                                    "members",
                                    selectedMembers.map((m) =>
                                      m.user === member.user._id
                                        ? { ...m, role: role as any }
                                        : m
                                    )
                                  );
                                }}
                              >
                                <SelectTrigger className="h-7 w-24 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="manager">
                                    Manager
                                  </SelectItem>
                                  <SelectItem value="contributor">
                                    Contributor
                                  </SelectItem>
                                  <SelectItem value="viewer">
                                    Viewer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
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
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
