import { BackButton } from "../../../components/back-button";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import {
  useChangePassword,
  useUpdateUserProfile,
  useUserProfileQuery,
} from "../../../hooks/use-user";
import { useAuth } from "../../../provider/auth-context";
import type { User } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "New password is required" }),
    confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  profilePicture: z.string().optional(),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { data: user, isPending } = useUserProfileQuery() as {
    data: User;
    isPending: boolean;
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // ✅ FIX: handle async user data properly
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  const { mutate: updateUserProfile, isPending: isUpdatingProfile } =
    useUpdateUserProfile();

  const {
    mutate: changePassword,
    isPending: isChangingPassword,
    error,
  } = useChangePassword();

  const handlePasswordChange = (values: ChangePasswordFormData) => {
    changePassword(values, {
      onSuccess: () => {
        toast.success(
          "Password updated successfully. You will be logged out. Please login again."
        );
        form.reset();

        setTimeout(() => {
          logout();
          navigate("/login");
        }, 3000);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.error || "Failed to update password";
        toast.error(errorMessage);
      },
    });
  };

  const handleProfileFormSubmit = (values: ProfileFormData) => {
    updateUserProfile(
      { name: values.name, profilePicture: values.profilePicture || "" },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error || "Failed to update profile";
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        profileForm.setValue("profilePicture", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="px-4 md:px-0">
        <BackButton />
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Separator />

      {/* ---------------- PROFILE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(handleProfileFormSubmit)}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20 bg-gray-600">
                <AvatarImage
                  src={
                    profileForm.watch("profilePicture") ||
                    user?.profilePicture
                  }
                  alt={user?.name}
                />
                <AvatarFallback className="text-xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                Change Avatar
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* NAME */}
            <div>
              <Label>Full Name</Label>
              <Input {...profileForm.register("name")} />
              {profileForm.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <Label>Email Address</Label>
              <Input value={user?.email} disabled />
              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed.
              </p>
            </div>

            <Button
              type="submit"
              className="w-fit"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ---------------- PASSWORD ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(handlePasswordChange)}
            className="grid gap-4"
          >
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label>Current Password</Label>
              <Input type="password" {...form.register("currentPassword")} />
              {form.formState.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label>New Password</Label>
              <Input type="password" {...form.register("newPassword")} />
              {form.formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" {...form.register("confirmPassword")} />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 w-fit"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
