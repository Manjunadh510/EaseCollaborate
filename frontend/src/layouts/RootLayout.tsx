import { Outlet } from "react-router-dom";
import ReactQueryProvider from "../provider/react-query-provider";
import { AuthProvider } from "../provider/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <div className="min-h-screen bg-gray-50">
          <Outlet />
        </div>
      </ReactQueryProvider>
    </AuthProvider>
  );
}