import { useState } from "react";
import { useAuth } from "../../../provider/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { useGetWorkspacesQuery } from "../../../hooks/use-workspace";
import { EditWorkspace } from "../../../components/workspace/edit-workspace";
import type { Workspace } from "../../../types";

const Settings = () => {
  const navigate = useNavigate();
  const { data: workspaces = [] } = useGetWorkspacesQuery();
  const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your workspaces
          </p>
        </div>
      </div>

      {/* Workspace Management */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Management</CardTitle>
          <CardDescription>
            Manage your workspaces
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!workspaces || workspaces.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No workspaces found</p>
              <Button
                onClick={() => navigate("/workspaces")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go to Workspaces
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {workspaces.map((workspace: Workspace) => (
                <div
                  key={workspace._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: workspace.color }}
                    />
                    <div>
                      <h4 className="font-semibold">{workspace.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {workspace.description?.substring(0, 50)}
                        {workspace.description && workspace.description.length > 50 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedWorkspace(workspace);
                      setIsEditingWorkspace(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EditWorkspace
        isEditingWorkspace={isEditingWorkspace}
        setIsEditingWorkspace={setIsEditingWorkspace}
        workspace={selectedWorkspace}
      />
    </div>
  );
};

export default Settings;

