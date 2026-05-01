import "../../styles/dark-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="dark-theme font-body">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/5 border-b border-white-600/30">
        <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto font-headline">
          <div className="text-2xl font-bold text-white hover:text-indigo-200">
            EaseCollaborate
          </div>

          <div className="hidden md:flex gap-10">
            <Link to="/" className="text-white font-bold hover:text-indigo-200" >
              Home
            </Link>
            <Link to="/features" className="text-white font-bold hover:text-indigo-200" >
                Features
            </Link>
            <Link to="/about" className="text-white font-bold hover:text-indigo-200" >
              About
            </Link>
          </div>

          <div className="flex gap-6">
            <Link to="/login">
              <button className="pt-2 hover:text-white font-bold ">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="kinetic-gradient px-6 py-2 rounded text-sm font-bold hover:text-white ">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <main className="pt-24">
        <motion.section
          className="py-18 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <span className="font-label  bg-indigo-200/50 text-indigo-800  text-xs tracking-widest uppercase mb-6 block px-4 py-1.5 rounded-full w-fit mx-auto font-bold">
            Project Management Redefined
          </span>

          <h1 className="text-6xl md:text-8xl font-extrabold mt-6 animate-fade-in-up">
            Orchestrate Every Detail
          </h1>

          <p className="text-on-surface-variant mt-6 max-w-2xl mx-auto">
            Carve your workflows out of obsidian. A high-fidelity command
            center.
          </p>

          <div className="flex gap-6 justify-center mt-10">
            <Link to="/login">
              <button className="ghost-border px-10 py-4 rounded bg-indigo-600 hover:bg-indigo-600/30 text-white transition-all font-bold">
                Start Workspace
              </button>
            </Link>
            <Link to="/features">
              <button className="ghost-border px-10 py-4 rounded hover:bg-indigo-200/10 transition-all font-bold">
                Explore Features
              </button>
            </Link>
          </div>
        </motion.section>

        {/* FEATURE */}
        <motion.section
          className="py-15 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-5xl font-bold">
                Smart <span className="text-indigo-500">Scheduling</span>
              </h2>

              <p className="text-on-surface-variant">
                Our boards adapt to your mental model.
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-indigo-500 ">
                    calendar_today
                  </span>
                  Team Analytics
                </div>
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-indigo-500">
                    query_stats
                  </span>
                  Important Tasks
                </div>
              </div>
            </div>

            <div className="md:col-span-7 rounded-xl bg-gray-700/30 border border-primary/20 relative overflow-hidden hover:-translate-y-2 transition-transform duration-500">
              <div className=" p-8 rounded-xl ghost-border relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 obsidian-glow opacity-40 group-hover:scale-150 transition-transform duration-700 animate-pulse-glow"></div>
                <div className="grid grid-cols-3 gap-4 ">
                  <div className="space-y-4">
                    <div className="bg-gray-300/20 h-32 rounded-lg p-4 ghost-border flex flex-col justify-between">
                      <div className="w-8 h-1 bg-primary rounded shadow-[0_0_10px_#bac3ff]"></div>
                      <div className="text-xs font-label font-bold opacity-50">
                        #TASK_001
                      </div>
                    </div>
                    <div className="bg-gray-300/20 h-48 rounded-lg p-4 ghost-border flex flex-col justify-between">
                      <div className="w-12 h-1 bg-secondary rounded shadow-[0_0_10px_#bac3ff]"></div>
                      <div className="text-xs  text-white font-bold font-label opacity-50">
                        #TASK_004
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="bg-gray-950/30 h-40 rounded-lg p-4 ghost-border border-primary/20 flex flex-col justify-between">
                      <div className="w-10 h-1 bg-primary rounded shadow-[0_0_10px_#bac3ff]"></div>
                      <div className="text-xs font-label text-indigo-500/70">
                        ACTIVE
                      </div>
                    </div>
                    <div className="bg-gray-950/30 h-24 rounded-lg p-4 ghost-border"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-300/20 h-56 rounded-lg p-4 ghost-border"></div>
                    <div className="bg-gray-300/20 h-20 rounded-lg p-4 ghost-border"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold">EaseCollaborate</div>

          <div className="flex gap-6 text-sm text-gray-400">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Twitter</a>
          </div>

          <div className="text-sm text-gray-500">© 2024 EaseCollaborate</div>
        </div>
      </footer>
    </div>
  );
}
