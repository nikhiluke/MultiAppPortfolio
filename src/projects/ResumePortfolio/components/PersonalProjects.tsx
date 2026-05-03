import {
	FaExternalLinkAlt,
	FaGithub,
	FaGlobe,
	FaTerminal,
} from "react-icons/fa";
import { motion } from "motion/react";
import resumeData from "../my_resume.json";
import { Link } from "react-router-dom";

interface PersonalProjectsProps {
	layout?: "standard" | "bento";
	theme?: "dark" | "light";
}

const PersonalProjects = ({
	layout = "standard",
	theme = "dark",
}: PersonalProjectsProps) => {
	const { personalProjects: projects } = resumeData;

	if (layout === "bento") {
		return (
			<div
				className={`rounded-3xl border p-6 py-4 transition-colors duration-500 ${
					theme === "dark"
						? "bg-slate-900/40 border-white/10"
						: "bg-white border-slate-200 shadow-sm"
				}`}
			>
				<div className="flex items-center gap-2 mb-4">
					<FaTerminal size={18} className="text-green-400" />
					<h2
						className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
					>
						Personal & Gen-AI Projects
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-3">
					{projects.map((p, i) => (
						<div
							key={i}
							className={`p-3 rounded-xl border transition-colors ${
								theme === "dark"
									? "bg-white/5 border-white/5 hover:bg-white/10"
									: "bg-slate-50 border-slate-200 hover:bg-white"
							}`}
						>
							<div className="flex justify-between items-start mb-1">
								<h4
									className={`text-xs font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
								>
									{p.title}
								</h4>
								<FaExternalLinkAlt
									size={12}
									className="text-slate-500"
								/>
							</div>
							<p
								className={`text-[10px] leading-tight mb-2 transition-colors ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
							>
								{p.desc}
							</p>
							<div className="flex gap-1">
								{p.tech.slice(0, 2).map((t) => (
									<span
										key={t}
										className={`text-[8px] px-1.5 py-0.5 rounded border transition-colors ${
											theme === "dark"
												? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
												: "bg-indigo-50 text-indigo-600 border-indigo-100"
										}`}
									>
										{t}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<section
			id="personal-projects"
			className={`py-20 border-t transition-colors duration-500 ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="flex items-center gap-4 mb-12"
			>
				<div
					className={`p-3 rounded-xl transition-colors ${theme === "dark" ? "bg-green-500/10 text-green-500" : "bg-green-50 text-green-600 border border-green-100"}`}
				>
					<FaTerminal size={24} />
				</div>
				<h2
					className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
				>
					Personal & Gen-AI Projects
				</h2>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-8">
				{projects.map((p, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: idx * 0.1 }}
						className={`p-8 rounded-2xl border transition-all group ${
							theme === "dark"
								? "bg-white/5 border-white/10 hover:border-green-500/30"
								: "bg-white border-slate-200 hover:border-green-500/40 hover:shadow-md"
						}`}
					>
						<div className="flex justify-between items-start mb-4">
							<h3
								className={`text-2xl font-bold transition-colors group-hover:text-green-500 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
							>
								{p.title}
							</h3>
							<div className="flex gap-3">
								{p.github && (
									<a
										href={p.github}
										className={`transition-colors ${theme === "dark" ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}
									>
										<FaGithub size={20} />
									</a>
								)}

								{p.link && (
									<a
										href={p.link}
										className={`transition-colors ${theme === "dark" ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}
									>
										<FaExternalLinkAlt size={20} />
									</a>
								)}
							</div>
						</div>
						<p
							className={`mb-6 leading-relaxed transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
						>
							{p.desc}
						</p>
						<div className="flex flex-wrap gap-2">
							{p.tech.map((t) => (
								<span
									key={t}
									className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${
										theme === "dark"
											? "bg-green-500/5 text-green-500 border-green-500/10"
											: "bg-green-50 text-green-700 border-green-100"
									}`}
								>
									{t}
								</span>
							))}
						</div>
						{p.link && (
							<Link
								to={p.link}
								className={`inline-flex items-center gap-3 px-4 py-2 my-4 rounded-full border transition-all ${
									theme === "dark"
										? "bg-green-500/5 border-green-500/20 text-green-500 hover:bg-green-500/10"
										: "bg-green-50 border-green-100 text-green-700 hover:bg-green-100"
								}`}
							>
								<div className="flex items-center gap-2">
									<span className="relative flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
									</span>
									<span className="text-xs font-bold uppercase tracking-widest">
										Active
									</span>
								</div>
								<div className="w-px h-3 bg-current opacity-20" />
								<FaGlobe
									size={14}
									className="animate-[spin_5s_linear_infinite]"
								/>
							</Link>
						)}
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default PersonalProjects;
