import { useEffect, useState } from "react";
import { colorOptions } from "./create-workspace";
import { cn } from "../../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDeleteWorkspaceMutation, useUpdateWorkspaceMutation } from "../../hooks/use-workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { workspaceSchema } from "../../lib/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { Workspace } from "../../types";

interface EditWorkspaceProps {
  isEditingWorkspace: boolean;
  setIsEditingWorkspace: (isEditingWorkspace: boolean) => void;
  workspace: Workspace | null;
}

export type WorkspaceEditForm = z.infer<typeof workspaceSchema>;

export const EditWorkspace = ({
  isEditingWorkspace,
  setIsEditingWorkspace,
  workspace,
}: EditWorkspaceProps) => {
  const navigate = useNavigate();
  const { mutate: updateWorkspace, isPending: isUpdating } = useUpdateWorkspaceMutation();
  const { mutate: deleteWorkspace, isPending: isDeleting } = useDeleteWorkspaceMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkspaceEditForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      color: colorOptions[0],
      description: "",
    },
  });

  // Populate form with workspace data when it opens
  useEffect(() => {
    if (isEditingWorkspace && workspace) {
      setValue("name", workspace.name);
      setValue("color", workspace.color || colorOptions[0]);
      setValue("description", workspace.description || "");
    }
  }, [isEditingWorkspace, workspace, setValue]);

  const selectedColor = watch("color");

  const onSubmit = (data: WorkspaceEditForm) => {
    if (!workspace) {
      toast.error("Workspace not found");
      return;
    }

    updateWorkspace(
      {
        workspaceId: workspace._id,
        ...data,
      },
      {
        onSuccess: () => {
          reset();
          setIsEditingWorkspace(false);
          toast.success("Workspace updated successfully");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
          );
        },
      }
    );
  };

  const handleDelete = () => {
    if (!workspace) {
      toast.error("Workspace not found");
      return;
    }

    deleteWorkspace(workspace._id, {
      onSuccess: () => {
        setIsEditingWorkspace(false);
        setShowDeleteConfirm(false);
        toast.success("Workspace deleted successfully");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      },
    });
  };

  return (
    <>
      <Dialog open={isEditingWorkspace} onOpenChange={setIsEditingWorkspace}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              {/* ✅ Name */}
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input {...register("name")} placeholder="Workspace Name" />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* ✅ Description */}
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  {...register("description")}
                  placeholder="Workspace Description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* ✅ Color Picker */}
              <div>
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-3 flex-wrap mt-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      onClick={() => setValue("color", color)}
                      className={cn(
                        "w-6 h-6 rounded-full cursor-pointer",
                        selectedColor === color &&
                          "ring-2 ring-offset-2 ring-blue-500"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.color.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isUpdating || isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Workspace
              </Button>
              <Button
                type="submit"
                disabled={isUpdating || isDeleting}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this workspace? This action cannot
              be undone. All projects and tasks in this workspace will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
