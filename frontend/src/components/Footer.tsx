export default function Footer() {
  return (
 <footer
        className="bg-[#10151a] full-width py-8 px-8 text-white"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto text-left">
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl font-black text-white tracking-tighter mb-8">EaseCollaborate</div>
            <p className="text-gray-400 font-body leading-relaxed text-sm max-w-xs">Building the structural foundation for the next generation of digital-first engineering teams.</p>
          </div>
          <div>
            <h5 className="font-headline font-extrabold text-white mb-6 uppercase tracking-widest text-xs">Product</h5>
            <ul className="space-y-4">
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">Capabilities</a></li>
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">Workflows</a></li>
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline font-extrabold text-white mb-6 uppercase tracking-widest text-xs">Resources</h5>
            <ul className="space-y-4">
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">Community</a></li>
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">Case Studies</a></li>
              <li><a className="text-gray-400 font-body text-sm hover:text-white transition-colors" href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline font-extrabold text-white mb-6 uppercase tracking-widest text-xs">Social</h5>
            <div className="flex space-x-4">
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 font-body text-sm">© 2024 EaseCollaborate. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a className="text-gray-400 font-body text-sm hover:text-white" href="#">Privacy Policy</a>
            <a className="text-gray-400 font-body text-sm hover:text-white" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
  );
}

