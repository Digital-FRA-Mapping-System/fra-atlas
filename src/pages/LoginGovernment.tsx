import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, User, Lock, ArrowLeft, ShieldCheck, Languages, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const LoginGovernment = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!employeeId || !password) {
    toast({ title: "Please fill all fields", variant: "destructive" });
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: employeeId,
        password: password,
        type: "government"
      })
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: data.msg || "Login failed",
        variant: "destructive"
      });
      return;
    }

    // ✅ store user from backend
    localStorage.setItem("fra_user", JSON.stringify(data.user));

    toast({
      title: "Login successful ✅"
    });

    navigate("/dashboard/government1");

  } catch (err) {
    toast({
      title: "Server error",
      variant: "destructive"
    });
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Left visual panel — dark forest */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden gradient-forest">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-forest-light/30 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-cream w-full">
          <Link to="/" className="inline-flex items-center gap-3 group w-fit">
            <div className="w-11 h-11 rounded-full gradient-amber flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="h-5 w-5 text-forest-dark" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/60">Govt. of India</p>
            </div>
          </Link>

          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/15 border border-amber/30 text-amber mb-6 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <ShieldCheck className="h-3 w-3" />
              Restricted · Authorized Personnel
            </div>
            <h2 className="font-display text-4xl xl:text-5xl font-bold leading-[1.05] mb-5 text-balance">
              The administrator's <span className="italic font-medium text-amber">command centre.</span>
            </h2>
            <p className="text-cream/75 leading-relaxed text-base">
              Review claims, oversee district-level statistics, and issue Records of Forest Rights from a single, audited workspace.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { v: "412", l: "Active Districts" },
                { v: "11.6L+", l: "Records Managed" },
              ].map((s) => (
                <div key={s.l} className="bg-cream/5 backdrop-blur border border-cream/10 rounded-xl p-4">
                  <p className="font-display text-2xl font-bold text-amber">{s.v}</p>
                  <p className="text-xs text-cream/60 uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-cream/50 font-mono">
            <span>© MoTA · {new Date().getFullYear()}</span>
            <span>NIC · ISO 27001 Certified</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-subtle">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest mb-3">— Officer Sign In</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              Restricted access.
            </h1>
            <p className="text-muted-foreground">Use your government-issued credentials to proceed.</p>
          </div>

          <Card className="shadow-elevated border-border">
            <CardContent className="p-7">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="empId" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Employee ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="empId" placeholder="GOV-XXXXX" value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="pl-10 h-11 font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Password</Label>
                    <button type="button" className="text-xs text-forest hover:underline font-medium">Reset</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 h-11" />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber/10 border border-amber/20 text-xs text-foreground">
                  <KeyRound className="h-3.5 w-3.5 text-amber shrink-0" />
                  <span>2-Factor OTP will be sent to your registered device.</span>
                </div>

                <Button type="submit" className="w-full h-11 bg-forest text-primary-foreground hover:bg-forest-light font-semibold">
                  Continue Securely
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-between text-xs">
            <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Languages className="h-3 w-3" /> EN / हिंदी
            </button>
            <p className="text-muted-foreground">
              Tribal citizen?{" "}
              <Link to="/login/tribal" className="text-forest font-semibold hover:underline">Citizen login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGovernment;
