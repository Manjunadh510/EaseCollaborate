import type { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { inviteMemberSchema } from "../../lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Check, Copy, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { useInviteMemberMutation } from "../../hooks/use-workspace";
import { toast } from "sonner";

interface InviteMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
}

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;

const ROLES = ["admin", "member", "viewer"] as const;

export const InviteMemberDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
}: InviteMemberDialogProps) => {
  const [inviteTab, setInviteTab] = useState("email");
  const [linkCopied, setLinkCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors},
  } = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const selectedRole = watch("role");

  const { mutate, isPending } = useInviteMemberMutation();

  const onSubmit = (data: InviteMemberFormData) => {
    if (!workspaceId) {
      toast.error("Workspace ID is missing");
      return;
    }

    console.log("Submitting invite with:", { workspaceId, email: data.email, role: data.role });

    mutate(
      {
        workspaceId,
        ...data,
      },
      {
        onSuccess: (response) => {
          console.log("Invite sent successfully", response);
          toast.success("Invite sent successfully");
          reset();
          setInviteTab("email");
          onOpenChange(false);
        },
        onError: (error: any) => {
          console.error("Invite error:", error);
          const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/workspace-invite/${workspaceId}`
    );
    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
        </DialogHeader>

        <Tabs value={inviteTab} onValueChange={setInviteTab}>
          <TabsList>
            <TabsTrigger value="email" disabled={isPending}>
              Send Email
            </TabsTrigger>
            <TabsTrigger value="link" disabled={isPending}>
              Share Link
            </TabsTrigger>
          </TabsList>

          {/* ---------------- EMAIL TAB ---------------- */}
          <TabsContent value="email">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              
              {/* EMAIL */}
              <div className="grid gap-2">
                <Label>Email Address</Label>
                <Input
                  placeholder="Enter email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ROLE */}
              <div className="grid gap-2">
                <Label>Select Role</Label>
                <div className="flex gap-3 flex-wrap">
                  {ROLES.map((role) => (
                    <label
                      key={role}
                      className="flex items-center cursor-pointer gap-2"
                    >
                      <input
                        type="radio"
                        value={role}
                        {...register("role")}
                        className="hidden"
                      />

                      <span
                        className={cn(
                          "w-7 h-7 rounded-full border-2 border-blue-300 flex items-center justify-center transition-all duration-300 bg-blue-900 text-white",
                          selectedRole === role &&
                            "ring-2 ring-blue-500 ring-offset-2"
                        )}
                      >
                        {selectedRole === role && (
                          <span className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </span>

                      <span className="capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="mr-2 inline-block animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* ---------------- LINK TAB ---------------- */}
          <TabsContent value="link">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Share this link to invite people</Label>

                <div className="flex items-center space-x-2">
                  <Input
                    readOnly
                    value={`${window.location.origin}/workspace-invite/${workspaceId}`}
                  />

                  <Button onClick={handleCopyInviteLink} disabled={isPending}>
                    {linkCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Anyone with the link can join this workspace
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};