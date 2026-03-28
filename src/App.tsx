import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Zap, 
  Droplets, 
  AlertTriangle, 
  Leaf, 
  ArrowRight, 
  Globe, 
  Wind, 
  Activity,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const EMISSION_DATA = [
  { name: 'Coal', value: 820, color: '#ef4444' },
  { name: 'Oil', value: 720, color: '#f97316' },
  { name: 'Gas', value: 490, color: '#eab308' },
  { name: 'Solar', value: 45, color: '#22c55e' },
  { name: 'Nuclear', value: 12, color: '#06b6d4' },
  { name: 'Wind', value: 11, color: '#10b981' },
];

const ENERGY_MIX_DATA = [
  { name: 'Fossil Fuels', value: 80, fill: '#3f3f46' },
  { name: 'Renewables', value: 15, fill: '#22c55e' },
  { name: 'Nuclear', value: 5, fill: '#06b6d4' },
];

// --- Components ---

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-3xl md:text-5xl font-display font-bold mb-4",
        light ? "text-zinc-900" : "text-white"
      )}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "max-w-2xl mx-auto text-lg",
          light ? "text-zinc-600" : "text-zinc-400"
        )}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const EnergyCard = ({ 
  title, 
  description, 
  icon: Icon, 
  type = 'clean' 
}: { 
  title: string, 
  description: string, 
  icon: any, 
  type?: 'clean' | 'harmful' 
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={cn(
      "p-8 rounded-2xl border transition-all duration-300",
      type === 'clean' 
        ? "bg-zinc-900/50 border-emerald-500/20 hover:border-emerald-500/50" 
        : "bg-zinc-900/50 border-red-500/20 hover:border-red-500/50"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
      type === 'clean' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
    )}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'nuclear-safety'>('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const NuclearSafetyPage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-zinc-950 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setView('home')}
          className="mb-12 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
        >
          <ArrowRight size={20} className="rotate-180" /> Back to Home
        </button>

        <header className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
            Deep Dive: Nuclear Safety
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white leading-tight">
            Engineering the <span className="text-cyan-400">Safest</span> Energy Source on Earth.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Nuclear power remains one of the safest and most efficient forms of energy production, underpinned by over six decades of operational experience and a safety record that is statistically superior to nearly every other major energy source.
          </p>
        </header>

        <div className="space-y-16">
          <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3 text-white">
              <ShieldCheck className="text-cyan-400" /> The Safety Record
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              According to the World Nuclear Association, nuclear energy is responsible for significantly fewer deaths per unit of electricity generated than fossil fuels, primarily because it does not produce the harmful air pollution that causes millions of premature deaths annually.
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/10 p-6 rounded-2xl">
              <p className="text-zinc-400 italic">
                "This safety is achieved through a 'defense-in-depth' philosophy—a system of multiple, independent layers of protection designed to ensure that even if one component fails, radioactive materials remain securely contained."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold mb-10 text-white">Lessons from History</h2>
            <div className="grid gap-8">
              {[
                {
                  year: "1979",
                  name: "Three Mile Island",
                  desc: "A partial meltdown that proved the effectiveness of Western containment structures; despite equipment failure, the containment building held, and there were no adverse health or environmental consequences for the public."
                },
                {
                  year: "1986",
                  name: "Chernobyl",
                  desc: "This disaster was the result of a unique, flawed Soviet reactor design (RBMK) that lacked a modern containment structure and was operated by inadequately trained personnel during an unauthorized test. Modern reactors are designed so that an explosion of this nature is physically impossible."
                },
                {
                  year: "2011",
                  name: "Fukushima Daiichi",
                  desc: "Triggered by a 'once-in-a-thousand-years' tsunami that flooded backup generators, this event led to a massive overhaul of global safety standards. It resulted in no deaths from radiation exposure, and the industry has since implemented 'FLEX' strategies—diverse and mobile backup power and water sources—to ensure reactors can stay cool even during total power grid failures."
                }
              ].map((event, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="text-cyan-500 font-display font-bold text-2xl shrink-0 pt-1">{event.year}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                    <p className="text-zinc-400 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-xl font-display font-bold mb-4 text-white">Generation III & III+</h3>
              <p className="text-zinc-400 leading-relaxed">
                Modern reactors have moved beyond the designs of the past by incorporating passive safety systems. Unlike older plants that required active mechanical pumps and human intervention to cool the core, modern plants use natural forces like gravity and convection.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-xl font-display font-bold mb-4 text-white">Passive Cooling</h3>
              <p className="text-zinc-400 leading-relaxed">
                This means that if a plant loses all power, it can cool itself automatically without any operator action. International oversight from the IAEA ensures a global "safety culture" where every minor incident is reported and used to improve the entire industry.
              </p>
            </div>
          </section>

          <footer className="pt-12 border-t border-zinc-800">
            <p className="text-zinc-400 text-lg leading-relaxed text-center italic">
              "By combining these advanced engineering breakthroughs with rigorous regulatory standards, the modern nuclear industry has effectively engineered out the vulnerabilities of the 20th century, making it a cornerstone of a safe, low-carbon energy future."
            </p>
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setView('home')}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold text-lg transition-all"
              >
                Return to Global Energy Overview
              </button>
            </div>
          </footer>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled || view !== 'home' ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={() => setView('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-zinc-950 group-hover:rotate-12 transition-transform">
              <Activity size={20} strokeWidth={3} />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">EcoPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#problem" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); setTimeout(() => window.location.hash = 'problem', 100); } }} className="hover:text-white transition-colors">The Crisis</a>
            <a href="#solution" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); setTimeout(() => window.location.hash = 'solution', 100); } }} className="hover:text-white transition-colors">Solutions</a>
            <a href="#data" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); setTimeout(() => window.location.hash = 'data', 100); } }} className="hover:text-white transition-colors">Data Insight</a>
            <button 
              onClick={() => setView('nuclear-safety')}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-2 rounded-full transition-all font-bold"
            >
              Take Action
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000" 
                  alt="Energy background" 
                  className="w-full h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950 to-zinc-950" />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    Energy Awareness 2026
                  </span>
                  <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tight text-white">
                    Powering the <span className="text-emerald-500">Future</span>, <br />
                    Protecting the <span className="text-emerald-400">Present</span>.
                  </h1>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our reliance on fossil fuels is reaching a breaking point. It's time to transition to a cleaner, safer, and more sustainable energy grid.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => setView('nuclear-safety')}
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      Explore Solutions <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a href="#data" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-lg border border-zinc-800 transition-all text-center">
                      View the Data
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
              >
                <ChevronDown size={32} />
              </motion.div>
            </section>

            {/* Energy Crisis Section */}
            <section className="py-24 px-6 bg-zinc-900/20 border-y border-zinc-800">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4 block">Global Context</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">Understanding the <span className="text-red-500">Energy Crisis</span></h2>
                    <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                      <p>
                        The global energy crisis refers to the growing challenge of meeting the world’s increasing demand for energy while dealing with rising prices, limited resources, and environmental consequences. Energy is essential for modern society because it powers homes, industries, transportation, and digital technology.
                      </p>
                      <p>
                        However, the world still relies heavily on fossil fuels such as coal, oil, and natural gas. This dependence not only contributes to environmental problems like climate change but also creates economic and political instability when energy supplies are disrupted.
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                    <h3 className="text-2xl font-display font-bold mb-6 text-white flex items-center gap-3">
                      <Globe className="text-red-500" /> Geopolitical Tension
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      One of the major causes of the energy crisis is the uneven distribution of energy resources around the world. Countries that produce large amounts of oil and gas often become centers of political tension because other nations depend on their resources.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                        <p className="text-sm text-zinc-300">
                          Competition for control of energy supplies has contributed to conflict and instability in regions like <span className="text-red-400">Nigeria, Sudan, and the Middle East</span>.
                        </p>
                      </div>
                      <p className="text-sm text-zinc-500 italic">
                        Environmental damage caused by oil extraction has also worsened tensions between communities and energy companies (Mother Jones, 2014).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Problem Section */}
            <section id="problem" className="py-24 px-6 bg-zinc-950">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="The hidden costs of our current energy consumption patterns are devastating our planet and our health.">
                  The Cost of Fossil Fuels
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <EnergyCard 
                    type="harmful"
                    icon={Droplets}
                    title="Crude Oil Dependency"
                    description="Oil extraction and spills devastate marine ecosystems and lead to long-term environmental degradation that takes decades to recover."
                  />
                  <EnergyCard 
                    type="harmful"
                    icon={AlertTriangle}
                    title="CO2 Emissions"
                    description="Burning coal and gas is the primary driver of global warming, causing extreme weather patterns and rising sea levels worldwide."
                  />
                  <EnergyCard 
                    type="harmful"
                    icon={Globe}
                    title="Air Pollution"
                    description="Fossil fuel combustion releases particulate matter that causes millions of respiratory-related deaths every year."
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-16 p-8 md:p-12 rounded-3xl bg-red-500/5 border border-red-500/10 flex flex-col md:flex-row items-center gap-12"
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-display font-bold mb-6 text-red-400">A Toxic Legacy</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                      For over a century, fossil fuels have powered our progress, but at a massive environmental cost. Crude oil, coal, and natural gas are finite resources that release carbon stored for millions of years in just a few decades.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "80% of global energy still comes from fossil fuels",
                        "Methane leaks from gas infrastructure are 80x more potent than CO2",
                        "Microplastics from oil-based products are now found in our bloodstream"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800">
                    <img 
                      src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000" 
                      alt="Pollution" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* The Solution Section */}
            <section id="solution" className="py-24 px-6 bg-zinc-900/30">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="Transitioning to clean energy isn't just an option—it's a necessity for a thriving future.">
                  The Clean Energy Revolution
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <EnergyCard 
                    icon={Sun}
                    title="Solar Power"
                    description="Harnessing the infinite energy of the sun to provide clean, decentralized power for homes and industries without any emissions."
                  />
                  <EnergyCard 
                    icon={ShieldCheck}
                    title="Nuclear Energy"
                    description="A high-density, zero-emission power source that provides reliable baseload energy to complement intermittent renewables."
                  />
                  <EnergyCard 
                    icon={Wind}
                    title="Wind Energy"
                    description="Utilizing natural air currents to generate massive amounts of electricity with minimal land footprint and zero water usage."
                  />
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000" 
                      alt="Solar panels" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 p-6 rounded-2xl">
                        <p className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                          <Leaf size={18} /> Sustainability Fact
                        </p>
                        <p className="text-white text-lg">
                          Solar energy is now the cheapest form of electricity in history, making the transition economically inevitable.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 transition-all">
                      <h4 className="text-2xl font-display font-bold mb-4 flex items-center gap-3 text-white">
                        <Zap className="text-emerald-400" /> Efficiency & Scale
                      </h4>
                      <p className="text-zinc-400 leading-relaxed">
                        Modern nuclear reactors and solar arrays are more efficient than ever. A single nuclear fuel pellet provides as much energy as a ton of coal, with zero carbon footprint during operation.
                      </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 transition-all">
                      <h4 className="text-2xl font-display font-bold mb-4 flex items-center gap-3 text-white">
                        <ShieldCheck className="text-emerald-400" /> Safety First
                      </h4>
                      <p className="text-zinc-400 leading-relaxed">
                        Statistically, nuclear and solar are the safest forms of energy production, resulting in the fewest deaths per terawatt-hour generated compared to any fossil fuel.
                      </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 transition-all">
                      <h4 className="text-2xl font-display font-bold mb-4 flex items-center gap-3 text-white">
                        <Globe className="text-emerald-400" /> Global Impact
                      </h4>
                      <p className="text-zinc-400 leading-relaxed">
                        Decentralized energy grids powered by renewables empower local communities and reduce geopolitical tensions over finite resource control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Insight Section */}
            <section id="data" className="py-24 px-6 bg-zinc-950">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="The numbers don't lie. The difference in carbon intensity between energy sources is staggering.">
                  The Data Behind the Change
                </SectionHeading>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Bar Chart */}
                  <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2 text-white">
                      <Activity size={20} className="text-emerald-400" /> 
                      CO2 Emissions per GWh (Tonnes)
                    </h3>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={EMISSION_DATA} layout="vertical" margin={{ left: 40, right: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            stroke="#a1a1aa" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                          />
                          <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ 
                              backgroundColor: '#18181b', 
                              border: '1px solid #3f3f46',
                              borderRadius: '12px',
                              color: '#fff'
                            }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                            {EMISSION_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-6 text-sm text-zinc-500 italic flex items-center gap-2">
                      <Info size={14} /> Source: IPCC Special Report on Renewable Energy Sources and Climate Change Mitigation.
                    </p>
                  </div>

                  {/* Pie Chart / Summary */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2 text-white">
                      <Globe size={20} className="text-emerald-400" /> 
                      Global Energy Mix
                    </h3>
                    <div className="h-[250px] w-full mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ENERGY_MIX_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {ENERGY_MIX_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#18181b', 
                              border: '1px solid #3f3f46',
                              borderRadius: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 flex-1">
                      {ENERGY_MIX_DATA.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                            <span className="text-zinc-400 text-sm">{item.name}</span>
                          </div>
                          <span className="font-bold text-white">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-800">
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Despite the growth of renewables, 80% of our energy still comes from fossil fuels. The gap represents the work ahead of us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-6 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">Ready to be part of the <span className="text-emerald-500">solution</span>?</h2>
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                  Every choice matters. From supporting clean energy policies to optimizing your own consumption, you have the power to accelerate the transition.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => setView('nuclear-safety')}
                    className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Join the Movement
                  </button>
                  <button className="w-full sm:w-auto px-10 py-5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-xl border border-zinc-800 transition-all">
                    Download Resource Kit
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <NuclearSafetyPage />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
            onClick={() => setView('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-zinc-950">
              <Activity size={16} strokeWidth={3} />
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-white">EcoPulse</span>
          </div>
          
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a>
          </div>

          <p className="text-sm text-zinc-600">
            © 2026 EcoPulse Initiative. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
