import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useResetPasswordMutation } from "../../../hooks/use-auth";
import { resetPasswordSchema } from "../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom"; // ✅ FIXED
import { toast } from "sonner";
import { z } from "zod";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid token");
      return;
    }

    resetPassword(
      { ...values, token },
      {
        onSuccess: () => setIsSuccess(true),
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message;
          toast.error(errorMessage || "Something went wrong");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">
            Enter your password below
          </p>
        </div>

        <Card>
          <CardHeader>
            <Link to="/sign-in" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to sign in</span>
            </Link>
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h1 className="text-xl font-bold">
                  Password reset successful
                </h1>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >

                {/* New Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    New Password
                  </label>

                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...register("newPassword")}
                  />

                  {errors.newPassword && (
                    <p className="text-sm text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Confirm Password
                  </label>

                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-indigo-600"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>

              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;