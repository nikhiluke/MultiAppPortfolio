import { useState } from "react";
import { LuMenu, LuX, LuSun, LuMoon, LuDownload } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
	currentLayout: "standard" | "bento";
	currentTheme: "dark" | "light";
	onToggleLayout: () => void;
	onToggleTheme: () => void;
}

const Navbar = ({
	currentLayout,
	currentTheme,
	onToggleLayout,
	onToggleTheme,
}: NavbarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = ["Experience", "Projects", "Skills", "Testimonials"];

	return (
		<nav
			className={`sticky top-0 w-full z-50 transition-colors duration-500 border-b ${
				currentTheme === "dark"
					? "bg-[#020617]/70 backdrop-blur-lg border-white/5"
					: "bg-white/80 backdrop-blur-md border-slate-200"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<motion.a
					href="/"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="flex items-center gap-2"
				>
					<motion.div
						whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
						animate={{
							rotate: [-2, 2, -2, 2, 0],
						}}
						transition={{
							duration: 0.5,
							repeat: Infinity,
							repeatDelay: 5,
						}}
						className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-indigo-600/20"
					>
						<img
							src={"/logo.jpg"}
							alt={"logo"}
							className="w-full h-full"
							referrerPolicy="no-referrer"
						/>
					</motion.div>
					<span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-default">
						Nikhil Uke
					</span>
				</motion.a>

				<div className="hidden md:flex items-center space-x-6">
					<div className="flex items-center space-x-6 mr-4 border-r border-slate-200/10 dark:border-white/10 pr-6">
						{navItems.map((item, index) => (
							<motion.a
								key={item}
								href={`#${item.toLowerCase()}`}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className={`text-sm font-medium transition-colors ${
									currentTheme === "dark"
										? "text-slate-400 hover:text-white"
										: "text-slate-600 hover:text-indigo-600"
								}`}
							>
								{item}
							</motion.a>
						))}
					</div>

					<div className="flex items-center gap-3">
						{/* Theme Toggle */}
						<motion.button
							onClick={onToggleTheme}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`p-2 rounded-full border transition-all ${
								currentTheme === "dark"
									? "border-white/10 text-yellow-400 hover:bg-white/5"
									: "border-slate-200 text-indigo-600 hover:bg-slate-100"
							}`}
						>
							{currentTheme === "dark" ? (
								<LuSun size={18} />
							) : (
								<LuMoon size={18} />
							)}
						</motion.button>

						<motion.button
							onClick={onToggleLayout}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-tighter ${
								currentTheme === "dark"
									? "border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/10"
									: "border-indigo-600/30 text-indigo-600 hover:bg-indigo-600/5"
							}`}
						>
							{currentLayout === "standard"
								? "Bento View"
								: "Standard View"}
						</motion.button>

						<motion.a
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href="NikhilUkeResume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 flex"
						>
							<LuDownload size={18} className="mr-2" />
							Download Resume
						</motion.a>
					</div>
				</div>

				<button
					className={`md:hidden p-2 transition-colors ${currentTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
				</button>
			</div>

			{/* Mobile LuMenu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className={`md:hidden border-b overflow-hidden transition-colors ${
							currentTheme === "dark"
								? "bg-[#020617] border-white/5"
								: "bg-white border-slate-200"
						}`}
					>
						<div className="p-6 space-y-4">
							{navItems.map((item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className={`block text-lg font-medium ${
										currentTheme === "dark"
											? "text-slate-300 hover:text-white"
											: "text-slate-600 hover:text-indigo-600"
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item}
								</a>
							))}
							<div className="pt-4 border-t border-slate-200/10 dark:border-white/10 flex flex-col gap-4">
								<button
									onClick={() => {
										onToggleTheme();
										setIsMenuOpen(false);
									}}
									className="flex items-center gap-2 text-sm font-medium text-indigo-400"
								>
									{currentTheme === "dark" ? (
										<>
											<LuSun size={18} /> Light Mode
										</>
									) : (
										<>
											<LuMoon size={18} /> Dark Mode
										</>
									)}
								</button>
								<button
									onClick={() => {
										onToggleLayout();
										setIsMenuOpen(false);
									}}
									className="text-sm font-medium text-indigo-400 text-left"
								>
									{currentLayout === "standard"
										? "Bento View"
										: "Standard View"}
								</button>
							</div>
							<a
								href="NikhilUkeResume.pdf"
								target="_blank"
								rel="noopener noreferrer"
							>
								<button className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 flex align-items-center">
									<LuDownload
										size={18}
										className="mr-2"
									/>
									Download Resume
								</button>
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
