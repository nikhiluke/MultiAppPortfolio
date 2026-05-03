import React from "react";
import { Box, Chip, Typography, Fade } from "@mui/material";
import { InView } from "react-intersection-observer";

const ToolsSummary = ({ tools }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div id="ToolsSummary" ref={ref}>
				<Fade in={inView} timeout={500}>
					<Box sx={{ mb: 4 }}>
						<Typography variant="h6" gutterBottom>
							Tools
						</Typography>
						<Box display="flex" flexWrap="wrap" gap={1}>
							{tools.map((tool, index) => (
								<Chip label={tool} key={index} color="secondary" />
							))}
						</Box>
					</Box>
				</Fade>
			</div>
		)}
	</InView>
);

export default ToolsSummary;
