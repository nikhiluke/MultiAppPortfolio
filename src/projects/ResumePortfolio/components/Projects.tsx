import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";
import resumeData from "../my_resume.json";

interface ProjectsProps {
	layout?: "standard" | "bento";
	theme?: "dark" | "light";
}

const Projects = ({ layout = "standard", theme = "dark" }: ProjectsProps) => {
	const [currentProject, setCurrentProject] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(false);
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

	const { projects } = resumeData;

	const nextProject = () => {
		setCurrentProject((prev) =>
			prev === projects.length - 1 ? 0 : prev + 1,
		);
	};

	const prevProject = () => {
		setCurrentProject((prev) =>
			prev === 0 ? projects.length - 1 : prev - 1,
		);
	};

	useEffect(() => {
		if (layout === "standard" && isAutoPlaying) {
			autoPlayRef.current = setInterval(nextProject, 5000);
		} else if (autoPlayRef.current) {
			clearInterval(autoPlayRef.current);
		}
		return () => {
			if (autoPlayRef.current) clearInterval(autoPlayRef.current);
		};
	}, [isAutoPlaying, layout]);

	if (layout === "bento") {
		return (
			<div
				className={`rounded-3xl border p-8 transition-colors duration-500 ${
					theme === "dark"
						? "bg-slate-900/40 border-white/10"
						: "bg-white border-slate-200 shadow-sm"
				}`}
			>
				<div className="flex items-center gap-2 mb-6">
					<LuLayoutDashboard size={18} className="text-cyan-400" />
					<h2
						className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
					>
						Project Highlights
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{projects.map((p, idx) => (
						<div
							key={idx}
							className={`group p-5 border rounded-2xl transition-all flex flex-col h-full ${
								theme === "dark"
									? "bg-white/5 border-white/10 hover:bg-white/10"
									: "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5"
							}`}
						>
							<p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
								{p.client}
							</p>
							<h4
								className={`text-sm font-bold mb-2 transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
							>
								{p.title}
							</h4>
							<p
								className={`text-[11px] mb-4 flex-grow line-clamp-3 leading-relaxed transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
							>
								{p.description}
							</p>
							<div className="flex flex-wrap gap-1 mt-auto">
								{p.tech.map((t) => (
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
			id="projects"
			className={`py-24 relative overflow-hidden border-t transition-colors duration-500 ${theme === "dark" ? "border-white/5" : "border-slate-100"}`}
		>
			<div className="flex items-center justify-between mb-16 relative z-10">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					className="flex items-center gap-4"
				>
					<div
						className={`p-3 rounded-xl transition-colors ${theme === "dark" ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-50 text-cyan-600 border border-cyan-100"}`}
					>
						<LuLayoutDashboard size={24} />
					</div>
					<h2
						className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
					>
						Featured Projects
					</h2>
				</motion.div>
				<div className="flex gap-3">
					<button
						onClick={prevProject}
						className={`p-3 rounded-full border transition-all ${
							theme === "dark"
								? "bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50"
								: "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm"
						}`}
					>
						<FaChevronLeft size={24} />
					</button>
					<button
						onClick={nextProject}
						className={`p-3 rounded-full border transition-all ${
							theme === "dark"
								? "bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50"
								: "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm"
						}`}
					>
						<FaChevronRight size={24} />
					</button>
				</div>
			</div>

			<div
				className="relative h-[450px] max-md:h-[600px] flex items-center justify-center perspective-1000"
				onMouseEnter={() => setIsAutoPlaying(false)}
				onMouseLeave={() => setIsAutoPlaying(true)}
			>
				<AnimatePresence mode="popLayout">
					{projects.map((project, idx) => {
						let offset = idx - currentProject;
						if (offset < -Math.floor(projects.length / 2))
							offset += projects.length;
						if (offset > Math.floor(projects.length / 2))
							offset -= projects.length;

						const isActive = offset === 0;
						const isVisible = Math.abs(offset) <= 1;

						if (!isVisible) return null;

						return (
							<motion.div
								key={idx}
								initial={{
									opacity: 0,
									x: offset * 100,
									scale: 0.8,
								}}
								animate={{
									opacity: isActive ? 1 : 0.4,
									x: offset * 360,
									scale: isActive ? 1.05 : 0.9,
									zIndex: isActive ? 30 : 10,
								}}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className={`absolute w-full max-w-[340px] md:max-w-[440px] transition-all cursor-pointer`}
								onClick={() => setCurrentProject(idx)}
							>
								<div
									className={`p-8 rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 group min-h-[320px] flex flex-col ${
										theme === "dark"
											? `bg-slate-900/40 ${isActive ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/20" : "border-white/10"}`
											: `bg-white/80 ${isActive ? "border-indigo-500/50 shadow-xl shadow-indigo-500/10 font-medium" : "border-slate-200"}`
									} hover:scale-[1.02] hover:border-indigo-400/80`}
								>
									<div className="mb-6">
										<p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
											{project.client}
										</p>
										<h3
											className={`text-3xl font-bold mb-4 transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
										>
											{project.title}
										</h3>
										<p
											className={`text-sm mb-8 leading-relaxed transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
										>
											{project.description}
										</p>
									</div>

									<div className="flex flex-wrap gap-2 mt-auto">
										{project.tech.map((t) => (
											<span
												key={t}
												className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border transition-colors ${
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
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>

			{/* Progress Bar */}
			<div className="max-w-xs mx-auto mt-12 h-1 bg-white/5 rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
					initial={{ width: 0 }}
					animate={{
						width: `${((currentProject + 1) / projects.length) * 100}%`,
					}}
					transition={{ duration: 0.5 }}
				></motion.div>
			</div>
		</section>
	);
};

export default Projects;
