import type { CreateProjectFormData } from "../components/project/create-project";
import { deleteData, fetchData, postData, updateData } from "../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectData: CreateProjectFormData;
      workspaceId: string;
    }) =>
      postData(
        `/projects/${data.workspaceId}/create-project`,
        data.projectData
      ),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.workspace],
      });
    },
  });
};

export const UseProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchData(`/projects/${projectId}/tasks`),
  });
};

export const useProjectDetailsQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => fetchData(`/projects/${projectId}`),
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      projectId: string;
      title: string;
      description?: string;
      status: string;
      dueDate: string;
      tags?: string;
    }) =>
      updateData(`/projects/${data.projectId}`, {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        tags: data.tags,
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["project", data._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-details", data._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteData(`/projects/${projectId}`),
    onSuccess: (data: any, projectId: string) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      // Invalidate workspace queries to refresh project list
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
    },
  });
};
