import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Features() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section className="relative pt-15 pb-5 overflow-hidden px-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
          <h1 className="text-3xl md:text-6xl font-black font-headline tracking-tighter leading-[0.9] text-on-surface mb-8">
                              The <span className="text-primary">Workflow</span> to  Build  Together
                          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-12">
                              Experience total project visibility with an interface built for precision. Manage high-velocity teams through structural rigour and kinetic minimalism.
                          </p>
          <div className="flex flex-wrap gap-4">
          <button className="signature-gradient text-on-primary px-8 py-4 rounded-full font-headline font-extrabold text-lg hover:shadow-xl transition-all duration-300">Launch Your Board</button>
          </div>
          </div>
          <div className="lg:col-span-5 relative hidden lg:block">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
          <div className="w-full h-100 bg-surface-container-low rounded-xl border border-outline-variant/20 kinetic-shadow overflow-hidden relative">
          <img alt="Professional workspace visualization" className="w-full h-full object-cover opacity-90 grayscale-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK4XkQ8MulLHV5JR9am4zkYjFU1A-ssMXPiLfanSkB8egmh_Nbvm6N3_61lgFtpeq1_hWRSzenwEU_1o4szzpCoiLVFoH62gFVrEv6wh4amLyD56edT7cyVtIkNVgXBoNH67NahoT38S1s530i2zmZtRQbjHBpjoZfOYb6pY29FTAZgt5FOqV4s9V39pGovz28-ZRS565x5mlFWqtcAacEVRUPb-ccG8ASttznMwf4FKtToQcvZjXHoS6b69dR-tIaYcT_Y4rPYu8"/>
          </div>
          </div>
          </div>
        </motion.section>
        {/* Dashboard Showcase */}
       
        <motion.section className="bg-surface-container py-5 px-8 border-2 border-outline-variant"
           initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
        <div className="max-w-7xl mx-auto">
        <div className="mb-10">
        <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface mb-4">Live Project Board</h2>
        <p className="text-on-surface-variant font-medium">Kinetic visualization of active workflows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 border-4 border-outline-variant kinetic-shadow">
        <div className="flex justify-between items-center mb-10">
        <div className="flex space-x-6">
        <span className="text-sm font-bold tracking-widest uppercase text-primary border-b-2 border-primary pb-1">Kanban</span>
        <span className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Timeline</span>
        <span className="text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">List</span>
        </div>
        <div className="flex -space-x-3">
        <div className="w-10 h-10 rounded-full border-2 border-surface-container overflow-hidden">
        <img alt="User 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZPYWNMbTk4PmGYSbx2DMlsVbr1b1u6kkXSNevlqs7iiRDmhovySivyCwB3QcM6wStoTWoPaZGypjGborcKGyVxKKyZfC_GsNiZMVxvxGqnmZDTVp1Qil5LqwKL_AepRs67BkYQdXppyWBjg_uyYivpFA-Nu1j9rmHQl3HBFdg-KbadRT-uLB2gL6AxUro46ae1H1MdVF_Uy3otRn1lkI6l7BndGl7pWUiA8yQuOTwOU94_7rEU2cMWnZKziX7iwwk_tdCMSIzAyQ"/>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-surface-container-lowest overflow-hidden">
        <img alt="User 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNODka8--tpxZdPdmSHQC_suk985SlUMWniE4kR_O2BkhB2XFJViL5BsnaYJUAsFqlKASHN5Jm0cus0MHfchSvVNG2yU8TW-IZVZiT0WdxapOFC-sCKMS8qSiVU-2_zbnNQIYhxM-V1mEQKM0PiktM7GMc2FP9KdWFVjm7a6wovj1xpUsNgIjPfeuyABPvsSpPxWpnz3k6Jsi_jQjUS7RdiERa7h08GLosD9xafHi7hu07KuH4DTxqVoB9ulEqwEsnNXso18GrXTM"/>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-[10px] font-bold border-2 border-surface-container-lowest text-on-surface-variant">+12</div>
        </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant/70">To Do</h3>
        <span className="bg-surface-variant/50 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">4</span>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg border-2 border-outline-variant hover:border-primary/20 transition-all cursor-pointer">
        <div className="w-8 h-1 mb-3 rounded-full bg-slate-700"></div>
        <p className="font-bold text-sm mb-4">Project Audit v2</p>
        <div className="flex items-center justify-between">
        <span className="material-symbols-outlined text-sm text-on-surface-variant">attach_file</span>
        <span className="text-[10px] font-bold text-on-surface-variant">OCT 24</span>
        </div>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg border-2 border-outline-variant hover:border-primary/20 transition-all cursor-pointer">
        <div className="w-8 h-1 mb-3 rounded-full bg-indigo-500"></div>
        <p className="font-bold text-sm mb-4">Core API Integration</p>
        <div className="flex items-center justify-between">
        <span className="material-symbols-outlined text-sm text-on-surface-variant">star</span>
        <span className="text-[10px] font-bold text-on-surface-variant">OCT 28</span>
        </div>
        </div>
        </div>

        <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant/70">In Progress</h3>
        <span className="bg-surface-variant px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">2</span>
        </div>
        <div className="bg-surface-container p-4 rounded-lg border-l-4  border-slate-400 shadow-sm hover:translate-y-0.5 transition-all cursor-pointer">
        <p className="font-bold text-sm mb-3">UI Component Library</p>
        <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden mb-4">
        <div className="bg-primary h-full w-[75%]"></div>
        </div>
        <div className="flex items-center justify-between">
        <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center">
        <span className="material-symbols-outlined text-xs text-primary">bolt</span>
        </div>
        <span className="text-[10px] font-bold text-primary">75% COMPLETE</span>
        </div>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-indigo-400 shadow-sm hover:translate-y-0.5 transition-all cursor-pointer">
        <p className="font-bold text-sm mb-3">Brand Revamp</p>
        <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden mb-4">
        <div className="bg-indigo-400 h-full w-[40%]"></div>
        </div>
        <div className="flex items-center justify-between">
        <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center">
        <span className="material-symbols-outlined text-xs text-indigo-400">brush</span>
        </div>
        <span className="text-[10px] font-bold text-indigo-400">40% COMPLETE</span>
        </div>
        </div>
        </div>

        <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant/70">Review</h3>
        <span className="bg-surface-variant/50 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">1</span>
        </div>
        <div className="bg-surface-container-high p-4 rounded-lg border-2 border-outline-variant/10 opacity-70">
        <p className="font-bold text-sm mb-4">User Feedback Synthesis</p>
        <div className="flex items-center justify-between">
        <span className="material-symbols-outlined text-sm text-on-surface-variant">chat</span>
        <span className="text-[10px] font-bold text-on-surface-variant">DONE</span>
        </div>
        </div>
        <button className="w-full py-4 border-2 border-dashed border-outline-variant/70 rounded-lg text-on-surface-variant text-xs font-black tracking-widest uppercase hover:border-primary hover:text-primary transition-all">
                                        + Add Task
                                    </button>
        </div>
        </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-1 gap-6">
        <div className="bg-surface-container-highest rounded-xl p-6 flex flex-col justify-between border-4 border-outline-variant/10 kinetic-shadow">
        <div>
        <h4 className="text-xs font-black tracking-widest uppercase text-on-surface-variant/70 mb-6">Velocity Index</h4>
        <div className="text-4xl font-black font-headline text-on-surface mb-2">84.2</div>
        <div className="flex items-center text-primary text-xs font-bold">
        <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                                        +12.5% vs last week
                                    </div>
        </div>
        <div className="mt-8 h-20 w-full flex items-end justify-between px-2">
        <div className="w-2 bg-surface-variant rounded-t-full h-[40%]"></div>
        <div className="w-2 bg-surface-variant rounded-t-full h-[60%]"></div>
        <div className="w-2 bg-surface-variant rounded-t-full h-[45%]"></div>
        <div className="w-2 bg-primary/40 rounded-t-full h-[90%]"></div>
        <div className="w-2 bg-surface-variant rounded-t-full h-[70%]"></div>
        <div className="w-2 bg-primary rounded-t-full h-full"></div>
        </div>
        </div>
        <div className="signature-gradient rounded-xl p-6 text-on-primary kinetic-shadow relative overflow-hidden">
        <div className="relative z-10">
        <h4 className="text-xs font-black tracking-widest uppercase opacity-80 mb-4">Project Health</h4>
        <p className="text-lg font-black font-headline leading-tight mb-4">Your project is tracking ahead of schedule.</p>
        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Optimized</span>
        </div>
        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10">speed</span>
        </div>
        </div>
        </div>
        </div>
        </motion.section>

        {/* Feature Deep Dive */}
        <motion.section
          className="py-5 px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
        
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-10">
          <div>
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl mb-8">
          <span className="material-symbols-outlined text-primary" >sync</span>
          </div>
          <h3 className="text-4xl font-black font-headline tracking-tighter text-on-surface mb-6">Real-time Sync</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                  Every interaction is broadcasted instantly across your entire team. No refreshing, no lag, just pure collaborative momentum.
                              </p>
          <ul className="space-y-4">
          <li className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="font-bold text-sm tracking-tight">Zero-latency state updates</span>
          </li>
          <li className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="font-bold text-sm tracking-tight">Multi-user workspace presence</span>
          </li>
          </ul>
          </div>
          <div className="bg-surface-container  p-2 rounded-2xl kinetic-shadow">
          <div className="bg-white rounded-xl p-8 aspect-video flex items-center justify-center border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
          <div className="relative flex items-center space-x-12">
          <div className="w-16 h-16 rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div className="h-0.5 w-24 bg-linear-to-r from-primary/20 to-primary relative">
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
          <div className="w-20 h-20 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-3xl">hub</span>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 bg-surface-container-highest p-2 rounded-2xl kinetic-shadow">
          <div className="bg-white rounded-xl p-8 aspect-video flex flex-col justify-center space-y-4 border-2 border-outline-variant/10">
          <div className="flex items-center space-x-2">
          <div className="w-24 h-3 bg-slate-300 rounded-full"></div>
          <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full w-[80%] bg-indigo-300"></div>
          </div>
          </div>
          <div className="flex items-center space-x-4">
          <div className="w-24 h-3 bg-slate-300 rounded-full"></div>
          <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full w-[60%] bg-primary"></div>
          </div>
          </div>
          <div className="flex items-center space-x-4">
          <div className="w-24 h-3 bg-slate-400 rounded-full"></div>
          <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full w-[95%] bg-slate-400"></div>
          </div>
          </div>
          </div>
          </div>
          <div className="order-1 lg:order-2">
          <div className="w-12 h-12 bg-slate-100 flex items-center justify-center rounded-xl mb-8">
          <span className="material-symbols-outlined text-slate-600">timeline</span>
          </div>
          <h3 className="text-4xl font-black font-headline tracking-tighter text-on-surface mb-6">Dynamic Timelines</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                  Static charts are a thing of the past. Our timelines shift as your priorities change, automatically recalculating critical paths.
                              </p>
          <div className="bg-surface-container p-6 rounded-xl border-l-4 border-primary">
          <p className="italic text-on-surface text-sm">"The ability to see resource bottlenecks before they happen has completely changed our delivery."</p>
          <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">— Lead Architect, Axiom Space</p>
          </div>
          </div>
          </div>
          </div>
          </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-5 px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto bg-surface-container-low rounded-2xl p-16 text-center relative overflow-hidden border border-outline-variant/20 kinetic-shadow">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full"></div>
            <h2 className="text-5xl font-black font-headline tracking-tighter text-on-surface mb-8 relative z-10">Ready to align your team?</h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto relative z-10">Join thousands of high-growth teams using EaseCollaborate to ship projects with precision.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <button className="signature-gradient text-on-primary px-10 py-5 rounded-full font-headline font-extrabold text-xl hover:shadow-2xl transition-all">Get Started Free</button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
