import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { BackButton } from "../../../../components/back-button";
import { Loader } from "../../../../components/loader";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { useProjectDetailsQuery, useUpdateProjectMutation } from "../../../../hooks/use-project";
import { updateProjectSchema } from "../../../../lib/schema";
import { useAuth } from "../../../../provider/auth-context";
import { ProjectStatus, type Project } from "../../../../types";
import { toast } from "sonner";

type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;

const EditProject = () => {
  const { projectId, workspaceId } = useParams<{
    projectId: string;
    workspaceId: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedDueDate, setExpandedDueDate] = useState(false);

  const { data: project, isLoading } = useProjectDetailsQuery(projectId!) as {
    data: Project;
    isLoading: boolean;
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: ProjectStatus.PLANNING,
      dueDate: "",
      tags: "",
    },
  });

  const { mutate: updateProject, isPending } = useUpdateProjectMutation();

  useEffect(() => {
    if (!project) return;

    reset({
      title: project.title,
      description: project.description || "",
      status: project.status,
      dueDate: project.dueDate ? new Date(project.dueDate).toISOString() : "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
    });
  }, [project, reset]);

  if (isLoading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const projectCreatorId =
    typeof project.createdBy === "string"
      ? project.createdBy
      : project.createdBy?._id;

  if (user?._id !== projectCreatorId) {
    return (
      <div className="space-y-4">
        <BackButton />
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Only the project creator can edit this project.
            </p>
            <Button onClick={() => navigate(`/workspaces/${workspaceId}/projects/${projectId}`)}>
              Back to Project
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dueDate = watch("dueDate");

  const onSubmit = (values: UpdateProjectFormData) => {
    updateProject(
      {
        projectId: project._id,
        title: values.title,
        description: values.description,
        status: values.status,
        dueDate: values.dueDate,
        tags: values.tags,
      },
      {
        onSuccess: () => {
          toast.success("Project updated successfully");
          navigate(`/workspaces/${workspaceId}/projects/${projectId}`);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update project"
          );
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <BackButton />

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the project title, description, status, due date, and tags.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input {...register("title")} placeholder="Enter project title" />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Project Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe your project..."
                rows={3}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Project Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(val) => setValue("status", val as any)}
              >
                <SelectTrigger className="w-full">
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

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                {...register("tags")}
                placeholder="Separated by comma (e.g. frontend, urgent)"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate(`/workspaces/${workspaceId}/projects/${projectId}`)
                }
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;
