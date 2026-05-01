import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="top-0 sticky z-50 bg-[#000000] shadow-lg">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-white  font-headline">
          EaseCollaborate
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight font-bold text-slate-300">
           <Link to="/" className="text-white font-bold hover:text-indigo-200">Home</Link>
            <Link to="/features" className="text-white font-bold hover:text-indigo-200">Features</Link>
            <Link to="/about" className="text-white font-bold hover:text-indigo-200">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="text-slate-300 hover:text-white font-bold text-sm transition-all active:scale-95">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-black-300 px-6 py-2.5 rounded-full font-bold text-sm snappy-hover active:scale-95 hover:bg-gray-300">Sign Up</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}