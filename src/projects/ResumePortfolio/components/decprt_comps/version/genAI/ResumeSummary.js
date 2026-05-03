import React from "react";
import { Card, CardContent, Typography, Grow } from "@mui/material";
import { InView } from "react-intersection-observer";

const ResumeSummary = ({ summary }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div ref={ref}>
				<Grow in={inView} timeout={500}>
					<Card sx={{ mb: 4 }}>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Resume Summary
							</Typography>
							<Typography variant="body1">{summary}</Typography>
						</CardContent>
					</Card>
				</Grow>
			</div>
		)}
	</InView>
);

export default ResumeSummary;
