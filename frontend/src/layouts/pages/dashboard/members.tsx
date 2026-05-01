import { Loader } from "../../../components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

import { useGetWorkspaceDetailsQuery } from "../../../hooks/use-workspace";
import type { Workspace } from "../../../types";

import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";

const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.search = search;

    setSearchParams(params, { replace: true });
  }, [search]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  const { data, isLoading } = useGetWorkspaceDetailsQuery(workspaceId!) as {
    data: Workspace;
    isLoading: boolean;
  };

  if (!workspaceId) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-linear-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 gap-4">
        <div className="p-4 bg-white rounded-full">
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M3 20.394c0-1.656.89-3.084 2.5-3.964M21 20.394c0-1.656-.89-3.084-2.5-3.964M9 12.75a3 3 0 11-6 0 3 3 0 016 0zm0 0v-1.5" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Workspace Selected</h2>
          <p className="text-gray-600 max-w-md">Please select a workspace from the header to view members.</p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!data || !workspaceId) return <div>No workspace found</div>;

  const filteredMembers = data?.members?.filter(
    (member) =>
      member.user.name.toLowerCase().includes(search.toLowerCase()) ||
      member.user.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">Workspace Members</h1>
      </div>

      <Input
        placeholder="Search members ...."
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
              <CardTitle>Members</CardTitle>
              <CardDescription>
                {filteredMembers?.length} members in your workspace
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {filteredMembers.map((member) => (
                  <div
                    key={member.user._id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <Avatar className="bg-gray-500 shrink-0">
                        <AvatarImage src={member.user.profilePicture} />
                        <AvatarFallback>
                          {member.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{member.user.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {member.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <Badge
                        variant={
                          ["admin", "owner"].includes(member.role)
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {member.role}
                      </Badge>

                      <Badge variant={"outline"} className="shrink-0">{data.name}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.user._id} className="">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="bg-gray-500 size-20 mb-4">
                    <AvatarImage src={member.user.profilePicture} />
                    <AvatarFallback className="uppercase">
                      {member.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-lg font-medium mb-2">
                    {member.user.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {member.user.email}
                  </p>

                  <Badge
                    variant={
                      ["admin", "owner"].includes(member.role)
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
