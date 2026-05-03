import { InView } from "react-intersection-observer";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

const ProjectSummarySlide = ({ projects }) => {
	const [slidesArr, setSlidesArr] = useState(projects);
	const handleButtonClick = useCallback(
		(action) => {
			if (action === "BACK") {
				slidesArr.push(slidesArr.shift())
			} else if (action === "FORWARD") {
				slidesArr.unshift(slidesArr.pop());
			}
			setSlidesArr([...slidesArr]);
		},
		[slidesArr]
	);

	const ProjectBox = React.memo(({ project, selected = false }) => {
		return (
			<Box>
				<Paper
					sx={{
						width: 300,
						height: 300,
						padding: 3,
						transform: selected ? "scale(1.1)" : "scale(0.9)",
						transition: "transform 2s linear",
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
	return (
		<InView triggerOnce>
			{({ inView, ref }) => (
				<div ref={ref}>
					<Box
						sx={{
							display: "flex",
							maxWidth: "lg",
							height: 500,
							padding: "32px 0",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<IconButton onClick={() => handleButtonClick("BACK")}>
							<ArrowBackIosRoundedIcon
								sx={{
									fontSize: 50,
								}}
							/>
						</IconButton>

						<ProjectBox project={slidesArr[0]} />
						<ProjectBox project={slidesArr[1]} selected={true} />
						<ProjectBox project={slidesArr[2]}  />

						<IconButton onClick={() => handleButtonClick("FORWARD")}>
							<ArrowForwardIosRoundedIcon
								sx={{
									fontSize: 50,
								}}
							/>
						</IconButton>
					</Box>
				</div>
			)}
		</InView>
	);
};

export default ProjectSummarySlide;
