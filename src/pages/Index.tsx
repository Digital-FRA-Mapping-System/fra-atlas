import { Link } from "react-router-dom";
import { Trees, Shield, Users, MapPin, ArrowRight, FileCheck, Globe2, ChevronRight, Award, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-forest.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Government utility strip */}
      <div className="bg-forest-dark text-cream/80 text-xs">
        <div className="container mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium tracking-wide">भारत सरकार · GOVERNMENT OF INDIA</span>
            <span className="hidden sm:inline text-cream/40">|</span>
            <span className="hidden sm:inline">Ministry of Tribal Affairs</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="hover:text-amber transition-colors">Skip to main content</button>
            <span className="text-cream/40">|</span>
            <button className="inline-flex items-center gap-1 hover:text-amber transition-colors">
              <Languages className="h-3 w-3" /> EN / हिं
            </button>
            <span className="text-cream/40">|</span>
            <button className="hover:text-amber transition-colors">A− A A+</button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber/20 blur-xl rounded-full" />
              <div className="relative w-11 h-11 rounded-full gradient-forest flex items-center justify-center ring-2 ring-amber/30">
                <Trees className="h-6 w-6 text-amber" />
              </div>
            </div>
            <div className="leading-tight">
              <p className="font-display text-xl font-bold text-foreground tracking-tight">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">Forest Rights · Govt. of India</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">

  <Link
    to="/about"
    className="hover:text-foreground transition-colors"
  >
    About
  </Link>

  <a
    href="/process"
    className="hover:text-foreground transition-colors"
  >
    Process
  </a>

  <a
    href="/act"
    className="hover:text-foreground transition-colors"
  >
    The Act
  </a>

  <a
    href="/contact"
    className="hover:text-foreground transition-colors"
  >
    Contact
  </a>

</div>
          <div className="flex items-center gap-2">
            <Link to="/login/tribal">
              <Button variant="ghost" className="text-foreground hover:bg-muted hidden sm:inline-flex">
                Tribal Login
              </Button>
            </Link>
            <Link to="/login/government">
              <Button className="bg-forest text-primary-foreground hover:bg-forest-light shadow-sm">
                Officer Login
                <ChevronRight className="ml-0.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Forest landscape of tribal India" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/15 backdrop-blur-sm border border-amber/30 text-amber mb-7 text-xs font-semibold uppercase tracking-[0.15em]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                Forest Rights Act · 2006
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.02] mb-6 text-balance">
                A digital ledger for
                <span className="block italic font-medium text-amber mt-2">tribal forest rights.</span>
              </h1>
              <p className="text-lg md:text-xl text-cream/75 font-body mb-10 max-w-xl leading-relaxed">
                A unified GIS platform recognising, recording and safeguarding the customary rights of Scheduled Tribes and traditional forest dwellers across India.
              </p>
              {/* <div className="flex flex-wrap gap-3">
                <Link to="/login/tribal">
                  {/* <Button size="lg" className="bg-amber text-forest-dark hover:bg-amber-light font-semibold text-base px-7 h-12 shadow-glow">
                    {/* File a Claim */}
                    {/* <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login/government">
                  <Button size="lg" variant="outline" className="border-cream/25 bg-cream/5 text-cream hover:bg-cream/10 backdrop-blur-sm text-base px-7 h-12"> */}
                    {/* Officer Portal */}
                  {/* </Button> */}
                {/* </Link> */} */
              {/* </div> */} */

              <div className="mt-14 pt-8 border-t border-cream/10 grid grid-cols-3 gap-6 max-w-xl">
                {[
                  { v: "11.6L+", l: "Claims Recognised" },
                  { v: "28", l: "States Covered" },
                  { v: "2.46Cr", l: "Acres Mapped" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl font-bold text-cream">{s.v}</p>
                    <p className="text-xs text-cream/60 uppercase tracking-wider mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating credential card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber/10 blur-3xl rounded-full" />
                <div className="relative bg-cream/10 backdrop-blur-xl border border-cream/15 rounded-2xl p-8 shadow-elevated">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-cream/60 text-xs uppercase tracking-widest">
                      <Award className="h-4 w-4 text-amber" /> Live Status
                    </div>
                    <span className="font-mono text-[10px] text-cream/50">FRA-IN-2024</span>
                  </div>
                  <p className="font-display text-2xl font-semibold text-cream leading-snug mb-6">
                    "जल, जंगल, ज़मीन"
                    <span className="block text-sm font-body font-normal text-cream/60 italic mt-1">— Water, Forest, Land</span>
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Pending Verification", val: "23,840", tone: "amber" },
                      { label: "Sanctioned This Month", val: "8,206", tone: "green" },
                      { label: "Active Districts", val: "412", tone: "cream" },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between py-2 border-b border-cream/10 last:border-0">
                        <span className="text-sm text-cream/70">{r.label}</span>
                        <span className={`font-mono font-semibold text-sm ${r.tone === "amber" ? "text-amber" : r.tone === "green" ? "text-green-300" : "text-cream"}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="process" className="py-28 bg-background relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest mb-4">— The Process</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance leading-tight">
              From village assembly to <span className="italic font-medium text-forest">recognised right.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Three transparent stages ensure every claim moves from the Gram Sabha to the District-Level Committee with full audit trail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-card border border-border">
            {[
              { num: "01", icon: MapPin, title: "Geo-tagged Mapping", desc: "Capture parcel boundaries via GPS and satellite overlays for evidence-grade accuracy." },
              { num: "02", icon: Users, title: "Community Filing", desc: "Individual (IFR) and Community (CFR) claims filed digitally with Gram Sabha endorsement." },
              { num: "03", icon: FileCheck, title: "Statutory Review", desc: "SDLC and DLC officials verify, annotate, and issue the Record of Forest Rights (RoFR)." },
            ].map((f) => (
              <div key={f.num} className="bg-card p-10 group hover:bg-cream/40 transition-colors">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-xl gradient-forest flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow">
                    <f.icon className="h-6 w-6 text-amber" />
                  </div>
                  <span className="font-display text-5xl font-bold text-muted-foreground/20">{f.num}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative py-20 gradient-forest overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-3">— Begin Now</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream text-balance leading-tight">
              Your forest. Your rights. <span className="italic font-medium text-amber">Your record.</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <Link to="/login/tribal">
              <Button size="lg" className="bg-amber text-forest-dark hover:bg-amber-light font-semibold h-12 px-7">
                Tribal Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login/government">
              <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10 h-12 px-7">
                Officer Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-dark text-cream/70 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-cream/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full gradient-amber flex items-center justify-center">
                  <Trees className="h-5 w-5 text-forest-dark" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-cream">FRA DigiMap</p>
                  <p className="text-[10px] uppercase tracking-widest text-cream/50">Govt. of India</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-md text-cream/60">
                The official digital infrastructure for the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006.
              </p>
            </div>
            <div>
              <p className="text-cream font-semibold text-sm mb-4">Resources</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber transition-colors">FRA Act, 2006</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">Rules & Amendments</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">State Nodal Officers</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">Annual Reports</a></li>
              </ul>
            </div>
            <div>
              <p className="text-cream font-semibold text-sm mb-4">Help & Support</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber transition-colors">Filing Guide</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">Contact Helpdesk</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">Grievance Portal</a></li>
                <li><a href="#" className="hover:text-amber transition-colors">RTI</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
            <p>© {new Date().getFullYear()} Ministry of Tribal Affairs · Government of India</p>
            <div className="flex items-center gap-4">
              <Globe2 className="h-3.5 w-3.5" />
              <span>Last updated · {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
