import { workspaceSchema } from "../../lib/schema";
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
import { useCreateWorkspace } from "../../hooks/use-workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CreateWorkspaceProps {
  isCreatingWorkspace: boolean;
  setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void;
}

export const colorOptions = [
  "#FF5733",
  "#33C1FF",
  "#28A745",
  "#FFC300",
  "#8E44AD",
  "#E67E22",
  "#2ECC71",
  "#34495E",
];

export type WorkspaceForm = z.infer<typeof workspaceSchema>;

export const CreateWorkspace = ({
  isCreatingWorkspace,
  setIsCreatingWorkspace,
}: CreateWorkspaceProps) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkspaceForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      color: colorOptions[0],
      description: "",
    },
  });

  const selectedColor = watch("color");

  const onSubmit = (data: WorkspaceForm) => {
    mutate(data, {
      onSuccess: (data: any) => {
        reset();
        setIsCreatingWorkspace(false);
        toast.success("Workspace created successfully");
        navigate(`/workspaces/${data._id}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <Dialog  open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
