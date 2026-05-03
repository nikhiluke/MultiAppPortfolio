import { LuWrench, LuCode, LuTerminal, LuFileCode } from "react-icons/lu";
import {
	SiNextdotjs,
	SiReact,
	SiNodedotjs,
	SiRedux,
	SiReduxsaga,
	SiJavascript,
	SiTypescript,
	SiMysql,
	SiJira,
	SiPostman,
	SiGit,
	SiGithub,
	SiGitlab,
	SiFigma,
	SiAlgolia,
	SiWebstorm,
	SiIcloud,
	SiHtml5,
	SiKeybase,
	SiRabbitmq,
	SiWebpack,
	SiNpm,
	SiCss,
	SiBootstrap,
	SiMui,
	SiTailwindcss,
	SiJest,
} from "react-icons/si";
import { motion } from "motion/react";
import resumeData from "../my_resume.json";

const ICON_MAP: Record<string, any> = {
	SiReact,
	SiNextdotjs,
	SiNodedotjs,
	SiRedux,
	SiReduxsaga,
	SiJavascript,
	SiTypescript,
	SiMysql,
	LuFileCode,
	SiJira,
	SiPostman,
	SiGit,
	SiGithub,
	SiGitlab,
	SiFigma,
	SiAlgolia,
	SiWebstorm,
	SiIcloud,
	LuTerminal,
	LuWrench,
	SiHtml5,
	SiKeybase,
	SiRabbitmq,
	SiWebpack,
	SiNpm,
	SiCss,
	SiBootstrap,
	SiMui,
	SiTailwindcss,
	SiJest,
};

interface SkillsProps {
	layout?: "standard" | "bento";
	theme?: "dark" | "light";
}

const SkillsnTools = ({ layout = "standard", theme = "dark" }: SkillsProps) => {
	const { skills: rawSkills, tools: rawTools } = resumeData;

	const skills = rawSkills.map((s) => ({
		...s,
		icon: ICON_MAP[s.icon] || LuCode,
		color:
			s.name === "Next JS"
				? theme === "dark"
					? "text-white"
					: "text-slate-900"
				: s.color,
	}));

	const tools = rawTools.map((t) => ({
		...t,
		icon:
			ICON_MAP[t.name.replace(" ", "")] || ICON_MAP[t.icon] || LuTerminal,
	}));

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	if (layout === "bento") {
		return (
			<section id="skills" className="py-2 h-full">
				<div className="grid grid-cols-1 gap-4 h-full">
					<div
						className={`rounded-3xl border p-6 flex flex-col transition-colors duration-500 ${
							theme === "dark"
								? "bg-slate-900/60 border-white/10"
								: "bg-white border-slate-200 shadow-sm"
						}`}
					>
						<div className="flex items-center gap-2 mb-4">
							<LuCode size={18} className="text-indigo-400" />
							<h2
								className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
							>
								Core Tech
							</h2>
						</div>
						<div className="flex flex-wrap gap-2">
							{skills.slice(0, 7).map((s) => (
								<div
									key={s.name}
									className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
										theme === "dark"
											? "bg-white/5 border-white/5 hover:bg-white/10 text-slate-300"
											: "bg-slate-50 border-slate-200 hover:bg-white text-slate-700"
									}`}
								>
									<s.icon size={14} className={s.color} />
									<span>{s.name}</span>
								</div>
							))}
						</div>
					</div>
					<div
						className={`rounded-3xl border p-6 flex flex-col transition-colors duration-500 ${
							theme === "dark"
								? "bg-slate-900/60 border-white/10"
								: "bg-white border-slate-200 shadow-sm"
						}`}
					>
						<div className="flex items-center gap-2 mb-4">
							<LuWrench size={18} className="text-orange-400" />
							<h2
								className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
							>
								Tools
							</h2>
						</div>
						<div className="flex flex-wrap gap-2">
							{tools.slice(0, 7).map((t) => (
								<div
									key={t.name}
									className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
										theme === "dark"
											? "bg-white/5 border-white/5 hover:bg-white/10 text-slate-300"
											: "bg-slate-50 border-slate-200 hover:bg-white text-slate-700"
									}`}
								>
									<t.icon size={14} className={t.color} />
									<span>{t.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="skills"
			className={`py-20 border-t transition-colors duration-500 ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
		>
			<div className="grid md:grid-cols-2 gap-16">
				<div>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center gap-4 mb-8"
					>
						<div
							className={`p-3 rounded-xl transition-colors ${theme === "dark" ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600 border border-purple-100"}`}
						>
							<LuCode size={24} />
						</div>
						<h2
							className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
						>
							Technical Skills
						</h2>
					</motion.div>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-2 sm:grid-cols-3 gap-3"
					>
						{skills.map((skill) => (
							<motion.div
								key={skill.name}
								variants={itemVariants}
								whileHover={{
									scale: 1.05,
									backgroundColor:
										theme === "dark"
											? "rgba(79, 70, 229, 0.1)"
											: "rgba(79, 70, 229, 0.05)",
									borderColor: "rgba(79, 70, 229, 0.3)",
								}}
								className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all cursor-default ${
									theme === "dark"
										? "bg-white/5 border-white/10 text-slate-300"
										: "bg-white border-slate-200 text-slate-700 shadow-sm"
								}`}
							>
								<skill.icon size={18} className={skill.color} />
								<span>{skill.name}</span>
							</motion.div>
						))}
					</motion.div>
				</div>

				<div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center gap-4 mb-8"
					>
						<div
							className={`p-3 rounded-xl transition-colors ${theme === "dark" ? "bg-orange-500/10 text-orange-400" : "bg-orange-50 text-orange-600 border border-orange-100"}`}
						>
							<LuWrench size={24} />
						</div>
						<h2
							className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
						>
							Professional Tools
						</h2>
					</motion.div>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-2 sm:grid-cols-3 gap-3"
					>
						{tools.map((tool) => (
							<motion.div
								key={tool.name}
								variants={itemVariants}
								whileHover={{
									scale: 1.05,
									backgroundColor:
										theme === "dark"
											? "rgba(249, 115, 22, 0.1)"
											: "rgba(249, 115, 22, 0.05)",
									borderColor: "rgba(249, 115, 22, 0.3)",
								}}
								className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all cursor-default ${
									theme === "dark"
										? "bg-white/5 border-white/10 text-slate-300"
										: "bg-white border-slate-200 text-slate-700 shadow-sm"
								}`}
							>
								<tool.icon size={18} className={tool.color} />
								<span>{tool.name}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default SkillsnTools;
