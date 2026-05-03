import { LuGraduationCap } from 'react-icons/lu';
import { motion } from 'motion/react';
import resumeData from '../my_resume.json';

interface EducationProps {
  layout?: 'standard' | 'bento';
  theme?: 'dark' | 'light';
}

const Education = ({ layout = 'standard', theme = 'dark' }: EducationProps) => {
  const { education } = resumeData;

  if (layout === 'bento') {
      return (
          <div className={`rounded-3xl border p-8 h-full flex flex-col justify-center gap-4 transition-colors duration-500 ${
            theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
              <div className="flex items-center gap-2 mb-2">
                  <LuGraduationCap size={18} className="text-green-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Education</h2>
              </div>
              <div>
                  <h3 className={`text-lg font-bold leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{education.degree}</h3>
                  <p className={`text-sm transition-colors ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>{education.institution}</p>
                  <div className={`mt-2 text-[10px] px-2 py-0.5 rounded-md border w-fit transition-colors ${
                    theme === 'dark' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-100'
                  }`}>
                    {education.period}
                  </div>
              </div>
          </div>
      );
  }

  return (
    <section id="education" className={`py-20 border-t transition-colors duration-500 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600 border border-green-100'}`}>
          <LuGraduationCap size={24} />
        </div>
        <h2 className={`text-3xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Education</h2>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`p-8 rounded-2xl border max-w-2xl transition-all group ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10 hover:border-green-500/30' 
            : 'bg-white border-slate-200 hover:border-green-500/40 shadow-sm'
        }`}
      >
        <h3 className={`text-xl font-bold mb-1 transition-colors group-hover:text-green-400 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{education.degree}</h3>
        <p className={`font-medium mb-4 transition-colors ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>{education.institution}, {education.location}</p>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className={`px-3 py-1 rounded-full border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>Graduated {education.year}</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
