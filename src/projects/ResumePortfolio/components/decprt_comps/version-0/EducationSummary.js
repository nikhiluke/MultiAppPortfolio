import React from "react";
import { Card, CardContent, Typography, Grow } from "@mui/material";
import { InView } from "react-intersection-observer";

const EducationSummary = ({ education }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div id="EducationSummary" ref={ref}>
				<Grow in={inView} timeout={500}>
					<div>
						<Typography variant="h6" gutterBottom>
							Education
						</Typography>
						{education.map((edu, index) => (
							<Card sx={{ mb: 2 }} key={index}>
								<CardContent>
									<Typography variant="h6">{edu.degree}</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										{edu.university} ({edu.year})
									</Typography>
								</CardContent>
							</Card>
						))}
					</div>
				</Grow>
			</div>
		)}
	</InView>
);

export default EducationSummary;
