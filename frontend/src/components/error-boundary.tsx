import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "./ui/button";

export function ErrorBoundary() {
  const error = useRouteError();

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let statusCode: number | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-pink-50 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{message}</h1>
            <p className="text-gray-600 text-sm">{details}</p>
          </div>

          {/* Stack Trace (Dev Only) */}
          {stack && (
            <div className="bg-gray-900 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-400">Debug Info:</p>
              <pre className="w-full overflow-x-auto text-xs text-red-400 font-mono leading-relaxed">
                <code>{stack}</code>
              </pre>
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1"
            >
              Go Back
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
