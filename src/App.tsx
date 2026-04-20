import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LoginTribal from "./pages/LoginTribal.tsx";
import LoginGovernment from "./pages/LoginGovernment.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardTribal from "./pages/DashboardTribal.tsx";
import DashboardGovernment from "./pages/DashboardGovernment.tsx";
import NotFound from "./pages/NotFound.tsx";
import ClaimsReview from "./pages/ClaimsReview";
import MainLayout from './layouts/MainLayout.tsx';
import Beneficiaries from "./pages/Beneficiaries.tsx";
import Analytics from  "./pages/Analytics.tsx";
import Alerts from "./pages/Alerts";
import MyLands from "./pages/MyLands";
import MyClaims from "./pages/MyClaims";
import MyAlerts from "./pages/MyAlerts";
import TribalLayout from "./layouts/TribalLayout";
import EarthEngineMap from "./pages/gei";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Index />} />

  <Route path="/login/tribal" element={<LoginTribal />} />
  <Route path="/login/government" element={<LoginGovernment />} />

  {/* ================= TRIBAL ================= */}
  <Route path="/dashboard/tribal" element={<TribalLayout />}>

    <Route index element={<DashboardTribal />} />
    <Route path="my-lands" element={<MyLands />} />
    <Route path="my-claims" element={<MyClaims />} />
    <Route path="my-alerts" element={<MyAlerts />} />

  </Route>
  <Route path="/dashboard/government1" element={<MainLayout />}>

  <Route index element={<DashboardGovernment />} />
  <Route path="claims-review" element={<ClaimsReview />} />
  <Route path="beneficiaries" element={<Beneficiaries />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="alerts" element={<Alerts />} />
  <Route path="gei" element={<EarthEngineMap/>} />
  <Route path="settings" element={<Settings/>} />
  <Route path="help" element={<Help/>} />

</Route>

  {/* ================= GOVERNMENT ================= */}
  

  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
