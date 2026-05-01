import { Header } from "../components/layout/header";
import { SidebarComponent } from "../components/layout/sidebar-component";
import { Loader } from "../components/loader";
import { CreateWorkspace } from "../components/workspace/create-workspace";
import { useAuth } from "../provider/auth-context";
import type { Workspace } from "../types";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../lib/api";

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

   const { data: workspaces = [], isLoading: wsLoading } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: async () => fetchData("/workspaces"),
  });

  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  if (isLoading || wsLoading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          workspaces={workspaces} 
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-4 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;