import { LuBriefcase } from 'react-icons/lu';
import { motion } from 'motion/react';
import resumeData from '../my_resume.json';

interface ExperienceProps {
  layout?: 'standard' | 'bento';
  theme?: 'dark' | 'light';
}

const Experience = ({ layout = 'standard', theme = 'dark' }: ExperienceProps) => {
  const { experiences } = resumeData;

  if (layout === 'bento') {
      return (
          <div className={`rounded-3xl border p-8 h-full transition-colors duration-500 ${
            theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
              <div className="flex items-center gap-2 mb-6">
                  <LuBriefcase size={18} className="text-indigo-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Experience Highlights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {experiences.map((exp, i) => (
                      <div key={i} className="space-y-2">
                          <div className="flex justify-between items-start">
                              <h3 className={`font-bold text-sm transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{exp.company}</h3>
                              <span className="text-[10px] text-indigo-400 font-bold">{exp.period}</span>
                          </div>
                          <p className={`text-xs transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>{exp.role}</p>
                          <p className={`text-[11px] leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{exp.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <section id="experience" className={`py-20 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
      >
        <div className={`p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
          <LuBriefcase size={24} />
        </div>
        <h2 className={`text-3xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Work Experience</h2>
      </motion.div>

      <div className={`relative border-l ml-6 space-y-12 transition-colors ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8 group"
          >
            <div className={`absolute top-0 left-[-8px] w-4 h-4 rounded-full border-2 transition-all group-hover:scale-125 ${
              theme === 'dark' ? 'bg-[#020617] border-indigo-500' : 'bg-white border-indigo-600'
            }`}></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
              }`}>
                {exp.company}
              </h3>
              <span className={`text-sm font-medium px-3 py-1 rounded-full border transition-colors ${
                theme === 'dark' ? 'text-indigo-400/80 bg-indigo-500/5 border-indigo-500/10 backdrop-blur-sm' : 'text-indigo-600 bg-indigo-50 border-indigo-100'
              }`}>
                {exp.period}
              </span>
            </div>
            <p className={`text-lg font-medium mb-2 transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{exp.role}</p>
            <p className={`leading-relaxed max-w-3xl transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
