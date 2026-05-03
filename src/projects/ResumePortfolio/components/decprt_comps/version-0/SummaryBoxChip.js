import React from "react";
import { Box, Chip, Typography, Fade } from "@mui/material";
import { InView } from "react-intersection-observer";

const SummaryBoxChip = ({ heading, summaryArr, chipColor }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div id={`${heading}ToolsSummary`} ref={ref}>
				<Fade in={inView} timeout={500}>
					<Box sx={{ mb: 4 }}>
						<Typography variant="h6" gutterBottom>
							{heading}
						</Typography>
						<Box display="flex" flexWrap="wrap" gap={1}>
							{summaryArr.map((element, index) => (
								<Chip label={element} key={index} color={chipColor} />
							))}
						</Box>
					</Box>
				</Fade>
			</div>
		)}
	</InView>
);

export default SummaryBoxChip;
