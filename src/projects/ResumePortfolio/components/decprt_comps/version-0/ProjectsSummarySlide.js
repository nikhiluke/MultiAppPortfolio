import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
	Backdrop,
	Box,
	IconButton,
	Paper,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./ProjectsSummarySlide.css";

const ProjectSummarySlide = ({ projects }) => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [isBackDropOpen, setBackDropOpen] = useState(false);
	const [onceLoad, setOnceLoad] = useState(false);
	let sliderRef = useRef(null);
	useEffect(() => {
		const handleScroll = () => {
			console.log(onceLoad);
			if (!onceLoad) {
				if (window.scrollY > 1200 && window.scrollY < 1700) {
					setBackDropOpen(true);
				} else {
					setBackDropOpen(false);
				}
			}
		};

		if (!onceLoad && isSm) {
			window.addEventListener("scroll", handleScroll);
		}

		return () => window.removeEventListener("scroll", handleScroll);
	}, [onceLoad, isSm]);

	const handleButtonClick = (action) => {
		if (action === "BACK") {
			sliderRef.slickNext();
		} else if (action === "FORWARD") {
			sliderRef.slickPrev();
		}
	};

	const ProjectBox = React.memo(({ project }) => {
		return (
			<Box>
				<Paper
					sx={{
						width: 300,
						height: 300,
						padding: 3,
					}}
					elevation={1}
				>
					<Typography variant="h6">{project.name}</Typography>
					<Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
						{project.technologies.join(", ")}
					</Typography>
					<Typography variant="body1">{project.description}</Typography>
				</Paper>
			</Box>
		);
	});

	const BackArrowButton = () => (
		<IconButton onClick={() => handleButtonClick("BACK")}>
			<ArrowBackIosRoundedIcon
				sx={{
					fontSize: 50,
				}}
			/>
		</IconButton>
	);

	const ForwardArrowButton = () => (
		<IconButton onClick={() => handleButtonClick("FORWARD")}>
			<ArrowForwardIosRoundedIcon
				sx={{
					fontSize: { sm: 50 },
				}}
			/>
		</IconButton>
	);

	const settings = {
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: <ForwardArrowButton />,
		prevArrow: <BackArrowButton />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1.45,
					centerMode: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					arrows: false,
					swipe: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1.02,
					arrows: false,
					swipe: true,
				},
			},
		],
	};
	return (
		<Box
			id="ProjectSummary"
			className="project-slide"
			sx={{
				maxWidth: "lg",
				padding: "32px 0",
			}}
		>
			<Slider
				ref={(slider) => {
					sliderRef = slider;
				}}
				{...settings}
			>
				{projects.map((project, index) => (
					<ProjectBox project={project} key={index} />
				))}
			</Slider>
			{isSm && !onceLoad && (
				<Backdrop
					sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
					open={isBackDropOpen}
					onClick={() => {
						console.log("clicked");
						setBackDropOpen(false);
						setOnceLoad(true);
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
							flexWrap:"wrap",
							justifyContent: "center"
						}}
					>	
						<p style={{
							width:"100vw",
							textAlign: "center"
						}}>Carousel can be</p>
						<ArrowBackIosRoundedIcon />
						<p>Swipe Back</p>
						<p> | </p>
						<p>Swipe Forward</p>
						<ArrowForwardIosRoundedIcon />
					</Box>
				</Backdrop>
			)}
		</Box>
	);
};

export default ProjectSummarySlide;
