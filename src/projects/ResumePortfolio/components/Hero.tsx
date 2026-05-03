import { FaChevronRight, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { motion } from "motion/react";
import resumeData from "../my_resume.json";

interface HeroProps {
	layout?: "standard" | "bento";
	theme?: "dark" | "light";
}

const Hero = ({ layout = "standard", theme = "dark" }: HeroProps) => {
	const { personalInfo } = resumeData;

	if (layout === "bento") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`rounded-3xl border p-8 flex flex-col justify-center relative overflow-hidden h-full min-h-[460px] transition-colors duration-500 ${
					theme === "dark"
						? "bg-gradient-to-br from-slate-900 to-[#0f172a] border-white/10 shadow-2xl shadow-black/50"
						: "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
				}`}
			>
				<div
					className={`absolute top-0 right-0 w-64 h-64 blur-[80px] -z-10 transition-opacity ${
						theme === "dark"
							? "bg-indigo-500/10 opacity-100"
							: "bg-indigo-500/5 opacity-50"
					}`}
				></div>
				<div
					className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mb-6 transition-colors ${
						theme === "dark"
							? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
							: "bg-indigo-50 border-indigo-200 text-indigo-600"
					}`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme === "dark" ? "bg-indigo-400" : "bg-indigo-600"}`}
					></span>
					{personalInfo.status}
				</div>
				<h1
					className={`text-5xl md:text-7xl font-black leading-none mb-4 tracking-tighter transition-colors ${
						theme === "dark" ? "text-white" : "text-slate-900"
					}`}
				>
					{personalInfo.role.split(" ")[0]}{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
						{personalInfo.role.split(" ").slice(1).join(" ")}
					</span>
				</h1>
				<p
					className={`text-lg leading-relaxed max-w-lg mb-8 transition-colors ${
						theme === "dark" ? "text-slate-400" : "text-slate-600"
					}`}
				>
					{personalInfo.summary}
				</p>
				<div className="flex items-center justify-between mt-auto">
					<div className="flex gap-4">
						<a
							href={
								personalInfo.socials.find(
									(s) => s.platform === "LinkedIn",
								)?.url
							}
							className={`p-3 rounded-xl border transition-all ${
								theme === "dark"
									? "bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-white/10"
									: "bg-slate-50 border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-white"
							}`}
						>
							<FaLinkedin size={20} className="text-blue-600"/>
						</a>
						<a
							href={
								personalInfo.socials.find(
									(s) => s.platform === "GitHub",
								)?.url
							}
							className={`p-3 rounded-xl border transition-all ${
								theme === "dark"
									? "bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-white/10"
									: "bg-slate-50 border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-white"
							}`}
						>
							<FaGithub size={20} />
						</a>
					</div>
					<div className="flex flex-col items-end">
						<p
							className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
						>
							Current Location
						</p>
						<p
							className={`text-sm flex items-center gap-1 transition-colors ${theme === "dark" ? "text-white font-medium" : "text-slate-900 font-medium"}`}
						>
							<FaGlobe
								size={14}
								className={
									theme === "dark"
										? "text-indigo-400"
										: "text-indigo-600"
								}
							/>{" "}
							{personalInfo.location}
						</p>
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<section className="pt-2 pb-20 flex flex-col md:flex-row items-center gap-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="flex-1 space-y-6 text-center md:text-left"
			>
				<div
					className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
						theme === "dark"
							? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
							: "bg-indigo-50 border-indigo-100 text-indigo-600"
					}`}
				>
					<span
						className={`w-2 h-2 rounded-full animate-pulse ${theme === "dark" ? "bg-indigo-400" : "bg-indigo-600"}`}
					></span>
					<span>{personalInfo.status}</span>
				</div>
				<h1
					className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-tight transition-colors ${
						theme === "dark" ? "text-white" : "text-slate-900"
					}`}
				>
					{personalInfo.role.split(" ")[0]}{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
						{personalInfo.role.split(" ").slice(1).join(" ")}
					</span>
				</h1>
				<p
					className={`text-lg transition-colors leading-relaxed max-w-2xl ${
						theme === "dark" ? "text-slate-400" : "text-slate-600"
					}`}
				>
					{personalInfo.longSummary}
				</p>
				<div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
					<motion.a
						href={`mailto:${personalInfo.email}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/25"
					>
						Let's Talk{" "}
						<FaChevronRight
							size={18}
							className="group-hover:translate-x-1 transition-transform"
						/>
					</motion.a>
					<div className="flex items-center gap-2">
						<motion.a
							href={
								personalInfo.socials.find(
									(s) => s.platform === "LinkedIn",
								)?.url
							}
							whileHover={{ y: -3 }}
							className={`p-4 rounded-xl border transition-all ${
								theme === "dark"
									? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
									: "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm"
							}`}
						>
							<FaLinkedin size={20} className="text-blue-600" />
						</motion.a>
						<motion.a
							href={
								personalInfo.socials.find(
									(s) => s.platform === "GitHub",
								)?.url
							}
							whileHover={{ y: -3 }}
							className={`p-4 rounded-xl border transition-all ${
								theme === "dark"
									? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
									: "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm"
							}`}
						>
							<FaGithub size={20} />
						</motion.a>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="relative group shrink-0"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{
						borderRadius: [
							"40% 60% 70% 30% / 40% 40% 60% 50%",
							"70% 30% 50% 50% / 30% 30% 70% 70%",
							"40% 60% 70% 30% / 40% 40% 60% 50%",
						],
						rotate: [0, 360],
						scale: [0.8, 1.1, 0.8],
						opacity: [0.4, 0.8, 0.4],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className={`absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur transition-opacity ${theme === "dark" ? "opacity-20 group-hover:opacity-40" : "opacity-10 group-hover:opacity-20"}`}
				></motion.div>
				<div
					className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 transition-colors ${
						theme === "dark"
							? "border-white/10 shadow-2xl"
							: "border-white shadow-xl"
					}`}
				>
					<img
						src={personalInfo.avatar}
						alt={personalInfo.name}
						className="w-full h-full object-cover object-[0_-30px] transition-transform duration-700 group-hover:scale-105"
						referrerPolicy="no-referrer"
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								`https://ui-avatars.com/api/?name=${personalInfo.name.replace(" ", "+")}&background=4f46e5&color=fff&size=512`;
						}}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
