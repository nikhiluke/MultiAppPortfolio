import { LuQuote } from 'react-icons/lu';
import { motion } from 'motion/react';
import resumeData from '../my_resume.json';

interface TestimonialsProps {
  layout?: 'standard' | 'bento';
  theme?: 'dark' | 'light';
}

const Testimonials = ({ layout = 'standard', theme = 'dark' }: TestimonialsProps) => {
  const { testimonials } = resumeData;

  if (layout === 'bento') {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {testimonials.map((t, idx) => (
                  <div key={idx} className={`rounded-3xl border p-6 flex flex-col gap-4 transition-colors duration-500 ${
                    theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                      <LuQuote className="text-indigo-500 opacity-50" size={24} />
                      <p className={`text-sm italic transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>"{t.content}"</p>
                      <div className="flex items-center gap-3 mt-auto">
                          <img src={t.avatar} alt={t.name} className={`w-8 h-8 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`} />
                          <div>
                              <h4 className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.name}</h4>
                              <p className={`text-[10px] transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.role}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      );
  }

  return (
    <section id="testimonials" className={`py-20 border-t transition-colors duration-500 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
      >
        <div className={`p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
          <LuQuote size={24} />
        </div>
        <h2 className={`text-3xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What People Say</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-8 rounded-2xl border relative group transition-all duration-500 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-md shadow-indigo-500/5'
            }`}
          >
            <LuQuote className={`absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity ${theme === 'dark' ? 'text-indigo-500' : 'text-indigo-400'}`} size={48} />
            <p className={`text-lg mb-6 italic leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium font-serif'}`}>
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className={`w-12 h-12 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`} />
              <div>
                <h3 className={`font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.name}</h3>
                <p className={`text-sm transition-colors ${theme === 'dark' ? 'text-indigo-400 font-bold' : 'text-indigo-600 font-medium'}`}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
