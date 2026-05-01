import { useState } from "react";
import { useAuth } from "../../provider/auth-context";
import type { Workspace } from "../../types";
import { Button } from "../ui/button";
import { Bell, PlusCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";

interface HeaderProps {
  workspaces: Workspace[];
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

export const Header = ({
  workspaces,
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isOnWorkspacePage = useLocation().pathname.includes("/workspaces");

  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleOnClick = (workspace: Workspace) => {
    onWorkspaceSelected(workspace);
    setShowWorkspaces(false);

    if (isOnWorkspacePage) {
      navigate(`/workspaces/${workspace._id}`);
    } else {
      navigate(`?workspaceId=${workspace._id}`);
    }
  };

  return (
    <div className="bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between px-4 py-4">

        {/* ✅ Workspace Selector */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowWorkspaces(!showWorkspaces)}
          >
            {selectedWorkspace ? (
              <>
                {selectedWorkspace.color && (
                  <WorkspaceAvatar
                    color={selectedWorkspace.color}
                    name={selectedWorkspace.name}
                  />
                )}
                <span className="ml-2">{selectedWorkspace.name}</span>
              </>
            ) : (
              "Select Workspace"
            )}
          </Button>

          {showWorkspaces && (
            <div className="absolute mt-2 w-56 bg-white border rounded shadow z-50" onClick={(e) => e.stopPropagation()}>
              {workspaces.map((ws) => (
                <div
                  key={ws._id}
                  onClick={() => handleOnClick(ws)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <WorkspaceAvatar color={ws.color} name={ws.name} />
                  {ws.name}
                </div>
              ))}

              <div
                onClick={onCreateWorkspace}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer border-t"
              >
                <PlusCircle className="w-4 h-4" />
                Create Workspace
              </div>
            </div>
          )}
        </div>

        {/* ✅ Right Side */}
        <div className="flex items-center gap-3 relative">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>

          {/* ✅ Profile */}
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              <Avatar className="w-8 h-8 border cursor-pointer">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50" onClick={(e) => e.stopPropagation()}>
                <Link
                  to="/user/profile"
                  className="block px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfile(false)}
                >
                  Profile
                </Link>
                <div
                  onClick={() => {
                    logout();
                    setShowProfile(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-t"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};