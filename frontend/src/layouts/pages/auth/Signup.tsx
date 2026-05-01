import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Mail, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import Header from "../../../components/Header"
import { signUpSchema } from "../../../lib/schema"
import { useSignUpMutation } from "../../../hooks/use-auth"
import { toast } from "sonner"

export type SignupFormData = z.infer<typeof signUpSchema>

export default function Signup() {
  const navigate = useNavigate()
  const { mutate, isPending } = useSignUpMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: SignupFormData) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Email Verification Required", {
          description:
            "Please check your email for a verification link. If you don't see it, please check your spam folder.",
        })
        reset()
        navigate("/login")
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "An error occurred during signup"
        toast.error(errorMessage)
      },
    })
  }

  const getInputClassName = (hasError: boolean) =>
    `h-12 w-full rounded-xl border bg-white pl-12 pr-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 hover:shadow-[0_8px_16px_rgba(139,92,246,0.1)] focus:ring-4 focus:outline-none ${
      hasError
        ? "border-red-300 focus:border-red-300 focus:ring-red-100"
        : "border-slate-200 focus:border-violet-300 focus:ring-violet-100"
    }`

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
            className="absolute top-32 -left-40 h-96 w-96 rounded-full bg-linear-to-br from-violet-400 to-violet-600 blur-3xl opacity-20"
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ x: [0, -26, 0], y: [0, 28, 0] }}
            className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-linear-to-br from-indigo-400 to-purple-600 blur-3xl opacity-20"
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.05),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.05),transparent_30%)]" />
        </div>

        {/* Animated Decorative Elements */}
        <section className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5], rotate: [0, 15, 0], scale: [1, 1.08, 1] }}
            className="absolute top-20 left-12 hidden h-24 w-24 rounded-3xl border-2 border-violet-300 bg-violet-100/80 shadow-lg md:block"
            transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5], y: [0, 24, 0], scale: [1, 1.08, 1] }}
            className="absolute bottom-24 right-12 hidden h-28 w-28 rounded-full border-2 border-indigo-300 bg-indigo-100/80 shadow-lg lg:block"
            transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Main Form Container */}
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-[0_24px_48px_rgba(139,92,246,0.2)] sm:p-10"
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="mb-8 text-center">
                
                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Join EaseCollaborate
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  Set up your account and start collaborating with your team.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full Name Field */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <label className="mb-2 block text-sm font-semibold tracking-wide text-slate-700" htmlFor="name">
                    Full Name
                  </label>
                  <div className="group relative">
                    <User className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-600" />
                    <input
                      autoComplete="name"
                      className={getInputClassName(!!errors.name)}
                      id="name"
                      placeholder="Enter your full name"
                      required
                      type="text"
                      {...register("name")}
                    />
                  </div>
                  {errors.name ? (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.name.message}
                    </motion.p>
                  ) : null}
                </motion.div>

                {/* Email Field */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <label className="mb-2 block text-sm font-semibold tracking-wide text-slate-700" htmlFor="email">
                    Email Address
                  </label>
                  <div className="group relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-600" />
                    <input
                      autoComplete="email"
                      className={getInputClassName(!!errors.email)}
                      id="email"
                      placeholder="name@company.com"
                      required
                      type="email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email ? (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.email.message}
                    </motion.p>
                  ) : null}
                </motion.div>

                {/* Password Field */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <label className="mb-2 block text-sm font-semibold tracking-wide text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <div className="group relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-600" />
                    <input
                      autoComplete="new-password"
                      className={getInputClassName(!!errors.password)}
                      id="password"
                      placeholder="Create a secure password"
                      required
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 transition-colors duration-300 hover:text-slate-600"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPassword(!showPassword)
                      }}
                      type="button"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password ? (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.password.message}
                    </motion.p>
                  ) : null}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <label className="mb-2 block text-sm font-semibold tracking-wide text-slate-700" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="group relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-600" />
                    <input
                      autoComplete="new-password"
                      className={getInputClassName(!!errors.confirmPassword)}
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 transition-colors duration-300 hover:text-slate-600"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowConfirmPassword(!showConfirmPassword)
                      }}
                      type="button"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.confirmPassword ? (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  ) : null}
                </motion.div>

                {/* Create Account Button */}
                <motion.button
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-base font-bold text-white shadow-lg shadow-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isPending}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isPending ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.p
                animate={{ opacity: 1 }}
                className="mt-8 text-center text-sm text-slate-600 transition-colors"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                Already have an account?
                <Link
                  className="ml-1 font-semibold text-violet-600 transition-colors duration-300 hover:text-violet-700"
                  to="/login"
                >
                  Sign in
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}