import { LuAward, LuTrophy, LuStar } from 'react-icons/lu';
import { motion } from 'motion/react';
import resumeData from '../my_resume.json';

const ICON_MAP: Record<string, any> = {
  LuAward, LuTrophy, LuStar
};

interface RecognitionsProps {
  layout?: 'standard' | 'bento';
  theme?: 'dark' | 'light';
}

const Recognitions = ({ layout = 'standard', theme = 'dark' }: RecognitionsProps) => {
  const { awards: rawAwards } = resumeData;

  const awards = rawAwards.map(a => ({
    ...a,
    icon: ICON_MAP[a.type] || LuTrophy
  }));

  if (layout === 'bento') {
      return (
          <div className={`rounded-3xl border p-6 py-4 transition-colors duration-500 ${
            theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
              <div className="flex items-center gap-2 mb-4">
                  <LuTrophy size={18} className="text-yellow-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Awards</h2>
              </div>
              <div className="space-y-3">
                  {awards.map((a, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <a.icon size={14} className="text-indigo-400" />
                              <span className={`text-xs font-medium transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{a.title}</span>
                          </div>
                          <span className={`text-[10px] font-bold transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{a.year}</span>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <section id="recognition" className={`py-20 border-t transition-colors duration-500 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
      >
        <div className={`p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'}`}>
          <LuTrophy size={24} />
        </div>
        <h2 className={`text-3xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recognitions</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-2xl border flex items-start gap-4 transition-all group ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-yellow-500/30' 
                : 'bg-white border-slate-200 hover:border-yellow-500/40 shadow-sm'
            }`}
          >
            <div className="p-3 rounded-lg bg-yellow-500/5 text-yellow-500 group-hover:scale-110 transition-transform">
              <award.icon size={20} />
            </div>
            <div>
              <h3 className={`font-bold text-lg transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{award.title}</h3>
              <p className={`text-sm transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{award.org}</p>
              <div className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">{award.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Recognitions;
