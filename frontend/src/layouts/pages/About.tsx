import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section
          className="relative min-h-[80vh] flex items-center px-8 overflow-hidden bg-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-label text-xs font-bold uppercase tracking-widest mb-6">Our DNA</span>
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8">
                            OUR <span className="text-primary">MISSION</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                            Architecting the future of workflow through precision engineering and kinetic design. We don't just manage projects; we orchestrate excellence for modern teams.
                        </p>
        </div>
        <div className="lg:col-span-5 relative hidden lg:block">
        <div className="aspect-4/5 w-full h-100  rounded-xl overflow-hidden ghost-border bg-slate-50 subtle-shadow relative">
        <img alt="Mission Graphic" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjJ9iGnWEA5HzndEN2vSb12jTK8JutpuD0j44PkP6wTixHgO-OHi6OK_r9pL47e0EZWA-yWs8A0WtlPiYttK6P8evWS4lu9KCHDDX7uHq82IolBophpgHK5Z0WmyWbQfN1IUT9vxtQWl7hfthNfV-s39EDLrfzWPLDKyfI30an_0OLTi0Nvf9FmskXbPdSPk-RjOIbrvlGKkl0iBukOKQZxUt4tjj9c_Ap5XErVvlHIXBCkDw4R3HLvY3rNmWBsGPqTMdmuNlz-ic"/>
        <div className="absolute inset-0 bg-linear-to-t from-white/20 via-transparent to-transparent">
        </div>
        </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10"></div>
            </div>
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.section
          className="py-10 bg-slate-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-2 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 md:col-start-3 text-center md:text-left">
              <div className="flex flex-col gap-10">
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="h-px w-24 bg-indigo-200"></div>
                  <span className="font-headline text-indigo-600 tracking-widest uppercase font-bold text-sm">Flow &amp; Engineering</span>
                </div>
                <blockquote className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
                  "True efficiency is found in the <span className="text-primary underline decoration-indigo-200 decoration-8 underline-offset-8">Flow</span>—where engineering excellence meets intuitive human interaction."
                </blockquote>
                <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">
                  Our philosophy is rooted in building robust structures that handle complexity while remaining invisible to the user. We believe the tools you use should feel like an extension of your own momentum.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="py-10 bg-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-2">
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-900 mb-4">Core Principles</h2>
              <p className="text-slate-500 text-lg">The foundations of how we build EaseCollaborate.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="p-10 rounded-2xl bg-white border-4 border-slate-200 subtle-shadow hover:-translate-y-2 transition-transform duration-500">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Radical Precision</h3>
                <p className="text-slate-600 leading-relaxed">We obsess over the micro-interactions. Every pixel and millisecond is optimized for your peak performance.</p>
              </div>
              {/* Value 2 */}
              <div className="p-10 rounded-2xl bg-white border-4 border-slate-200 subtle-shadow hover:-translate-y-2 transition-transform duration-500">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Intuitive Kineticism</h3>
                <p className="text-slate-600 leading-relaxed">Tools should move with you. Our interface predicts your next step, maintaining your cognitive flow state.</p>
              </div>
              {/* Value 3 */}
              <div className="p-10 rounded-2xl bg-white border-4 border-slate-200 subtle-shadow hover:-translate-y-2 transition-transform duration-500">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Unshakeable Trust</h3>
                <p className="text-slate-600 leading-relaxed">Privacy and reliability aren't features—they're the bedrock. Your data is secure, always available, and under your control.</p>
              </div>
            </div>
          </div>
        </motion.section>

       
      </main>
      <Footer />
    </div>
  );
}