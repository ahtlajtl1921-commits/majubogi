import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";

import Home from "@/pages/Home";
import Sessions from "@/pages/Sessions";
import Application from "@/pages/Application";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import Payment from "@/pages/Payment";
import FAQ from "@/pages/FAQ";
import Inquiry from "@/pages/Inquiry";
import Admin from "@/pages/Admin";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTE_PATHS.HOME} element={<Home />} />
              <Route path={ROUTE_PATHS.SESSIONS} element={<Sessions />} />
              <Route path={ROUTE_PATHS.APPLICATION} element={<Application />} />
              <Route path={`${ROUTE_PATHS.APPLICATION}/:sessionId`} element={<Application />} />
              <Route path={ROUTE_PATHS.PROFILE} element={<Profile />} />
              <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
              <Route path={ROUTE_PATHS.PAYMENT} element={<Payment />} />
              <Route path={ROUTE_PATHS.FAQ} element={<FAQ />} />
              <Route path={ROUTE_PATHS.INQUIRY} element={<Inquiry />} />
              <Route path={ROUTE_PATHS.ADMIN} element={<Admin />} />
              <Route path={ROUTE_PATHS.PRIVACY} element={<Privacy />} />
              <Route path={ROUTE_PATHS.TERMS} element={<Terms />} />
              
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
                    <p className="text-muted-foreground mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
                    <button
                      onClick={() => window.location.href = ROUTE_PATHS.HOME}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                      홈으로 돌아가기
                    </button>
                  </div>
                }
              />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
      <Toaster />
      <Sonner position="top-center" expand={false} richColors />
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;