import React from "react";
import { Box, Chip, Typography, Fade } from "@mui/material";
import { InView } from "react-intersection-observer";

const SkillsSummary = ({ skills }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div id="SkillSummary" ref={ref}>
				<Fade in={inView} timeout={500}>
					<Box sx={{ mb: 4 }}>
						<Typography variant="h6" gutterBottom>
							Skills
						</Typography>
						<Box display="flex" flexWrap="wrap" gap={1}>
							{skills.map((skill, index) => (
								<Chip label={skill} key={index} color="primary" />
							))}
						</Box>
					</Box>
				</Fade>
			</div>
		)}
	</InView>
);

export default SkillsSummary;
