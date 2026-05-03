import { LuMail, LuCopy, LuCheck } from 'react-icons/lu';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import resumeData from '../my_resume.json';

interface FooterProps {
  theme?: 'dark' | 'light';
}

const Footer = ({ theme = 'dark' }: FooterProps) => {
  const { personalInfo } = resumeData;
  const [copied, setCopied] = useState(false);
  const email = personalInfo.email;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className={`py-20 border-t text-center relative overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'border-white/5' : 'border-slate-100'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">together</span>
        </h2>
        <p className={`mb-10 max-w-md mx-auto leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          I'm currently looking for new opportunities as a {personalInfo.role}. Whether you have a question or just want to say hi, my inbox is always open!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a 
            href={`mailto:${email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
              theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30'
            }`}
          >
            <LuMail size={20} /> Email Me
          </motion.a>
          <motion.button 
            onClick={copyEmail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-xl font-semibold border transition-all flex items-center justify-center gap-2 ${
              theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div 
                  key="check" 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-2 text-green-500"
                >
                  <LuCheck size={20} /> Copied!
                </motion.div>
              ) : (
                <motion.div 
                  key="copy" 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <LuCopy size={20} /> Copy Email
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="mt-24 space-y-4">
          <p className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} {personalInfo.name}. Built with React & Tailwind CSS.
          </p>
          <div className="flex justify-center gap-6">
            {personalInfo.socials.map(social => (
              <a key={social.platform} href={social.url} className={`text-xs transition-colors uppercase tracking-widest font-bold ${
                theme === 'dark' ? 'text-slate-600 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'
              }`}>
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
