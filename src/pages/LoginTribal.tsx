import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trees, User, Lock, ArrowLeft, ShieldCheck, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-forest.jpg";

const LoginTribal = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!aadhaar || !password) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
  
    try {
      // 🔥 Fetch beneficiaries
      const res = await fetch("http://localhost:5000/beneficiaries");
      const data = await res.json();
  
      // 🔍 Find user by Aadhaar
      const user = data.find((b: any) => b.aadhaar === aadhaar);
  
      if (!user) {
        toast({ title: "User not found", variant: "destructive" });
        return;
      }
  
      // ✅ Store user WITH claim_id
      localStorage.setItem("fra_user", JSON.stringify({
        type: "tribal",
        name: user.name,
        aadhaar: user.aadhaar,
        claim_id: user.claim_id   // 🔥 IMPORTANT
      }));
  
      navigate("/dashboard/tribal");
  
    } catch (err) {
      toast({ title: "Server error", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <img src={heroImage} alt="Forest landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-cream w-full">
          <Link to="/" className="inline-flex items-center gap-3 group w-fit">
            <div className="w-11 h-11 rounded-full gradient-amber flex items-center justify-center group-hover:scale-105 transition-transform">
              <Trees className="h-5 w-5 text-forest-dark" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/60">Govt. of India</p>
            </div>
          </Link>

          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/15 border border-amber/30 text-amber mb-6 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              Tribal Citizen Portal
            </div>
            <h2 className="font-display text-4xl xl:text-5xl font-bold leading-[1.05] mb-5 text-balance">
              Your forest. <span className="italic font-medium text-amber">Your record.</span>
            </h2>
            <p className="text-cream/75 leading-relaxed text-base">
              Securely view your land claims, monitor sanction status, and exercise your rights under the Forest Rights Act, 2006.
            </p>
            <div className="mt-8 pt-6 border-t border-cream/15 flex items-center gap-4 text-xs text-cream/60">
              <ShieldCheck className="h-4 w-4 text-amber" />
              <span>Aadhaar-secured · End-to-end encrypted · NIC compliant</span>
            </div>
          </div>

          <p className="text-xs text-cream/50 font-mono">© Ministry of Tribal Affairs · {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-subtle">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest mb-3">— Sign In</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              Welcome to your portal.
            </h1>
            <p className="text-muted-foreground">Authenticate with your Aadhaar to continue.</p>
          </div>

          <Card className="shadow-elevated border-border">
            <CardContent className="p-7">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Aadhaar Number</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="aadhaar" placeholder="XXXX-XXXX-XXXX" value={aadhaar} onChange={e => setAadhaar(e.target.value)} className="pl-10 h-11 font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Password</Label>
                    <button type="button" className="text-xs text-forest hover:underline font-medium">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 h-11" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 bg-forest text-primary-foreground hover:bg-forest-light font-semibold">
                  Sign In Securely
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button variant="outline" className="w-full h-11">
                <ShieldCheck className="h-4 w-4 mr-2 text-forest" />
                Sign in with DigiLocker
              </Button>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-between text-xs">
            <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Languages className="h-3 w-3" /> EN / हिंदी
            </button>
            <p className="text-muted-foreground">
              Government official?{" "}
              <Link to="/login/government" className="text-forest font-semibold hover:underline">Officer login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTribal;
