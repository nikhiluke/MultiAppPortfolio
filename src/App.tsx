import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ResumePortfolio from "./projects/ResumePortfolio";
import CustomJSEditor from "./projects/OnlineJsEditor";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

function PageTransitions() {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<ResumePortfolio />} />
				<Route
					path="/my-projects/online-js-Editor"
					element={<CustomJSEditor />}
				/>
			</Routes>
		</AnimatePresence>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<PageTransitions />
		</BrowserRouter>
	);
}
