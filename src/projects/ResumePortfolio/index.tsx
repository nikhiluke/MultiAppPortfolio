import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import SkillsnTools from "./components/SkillsnTools";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Recognitions from "./components/Recognitions";
import PersonalProjects from "./components/PersonalProjects";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

export default function Index() {
    const [layout, setLayout] = useState<"standard" | "bento">("standard");
    const [theme, setTheme] = useState<"dark" | "light">("light");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const toggleLayout = () => {
        setLayout((prev) => (prev === "standard" ? "bento" : "standard"));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${
                theme === "dark"
                    ? "bg-[#020617] text-slate-200"
                    : "bg-slate-50 text-slate-900"
            } font-sans selection:bg-indigo-500/30`}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div
                    className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full transition-colors duration-700 ${
                        theme === "dark"
                            ? "bg-indigo-900/20"
                            : "bg-indigo-200/40"
                    }`}
                ></div>
                <div
                    className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full transition-colors duration-700 ${
                        theme === "dark" ? "bg-blue-900/10" : "bg-blue-100/30"
                    }`}
                ></div>
            </div>

            <Navbar
                currentLayout={layout}
                currentTheme={theme}
                onToggleLayout={toggleLayout}
                onToggleTheme={toggleTheme}
            />

            <main className="max-w-6xl mx-auto px-6 relative py-12">
                <AnimatePresence mode="wait">
                    {layout === "bento" ? (
                        <motion.div
                            key={`bento-${theme}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4"
                        >
                            <div className="md:col-span-8">
                                <Hero layout="bento" theme={theme} />
                            </div>
                            <div className="md:col-span-4 flex flex-col gap-4">
                                <Recognitions layout="bento" theme={theme} />
                                <SkillsnTools layout="bento" theme={theme} />
                            </div>

                            <div className="md:col-span-12">
                                <Experience layout="bento" theme={theme} />
                            </div>

                            <div className="md:col-span-12">
                                <Projects layout="bento" theme={theme} />
                            </div>

                            <div className="md:col-span-6">
                                <PersonalProjects
                                    layout="bento"
                                    theme={theme}
                                />
                            </div>
                            <div className="md:col-span-6">
                                <Testimonials layout="bento" theme={theme} />
                            </div>

                            <div className="md:col-span-12">
                                <Education layout="bento" theme={theme} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`standard-${theme}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-0"
                        >
                            <Hero layout="standard" theme={theme} />
                            <Experience layout="standard" theme={theme} />
                            <Projects layout="standard" theme={theme} />
                            <PersonalProjects layout="standard" theme={theme} />
                            <SkillsnTools layout="standard" theme={theme} />
                            <Recognitions layout="standard" theme={theme} />
                            <Testimonials layout="standard" theme={theme} />
                            <Education layout="standard" theme={theme} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Footer theme={theme} />
            </main>
        </div>
    );
}