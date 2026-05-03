import React from "react";
import { Card, CardContent, Typography, Grid, Slide } from "@mui/material";
import { InView } from "react-intersection-observer";

const ProjectsSummary = ({ projects }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div ref={ref}>
				<Slide in={inView} direction="up" timeout={500}>
					<Grid container spacing={3} sx={{ mb: 4 }}>
						{projects.map((project, index) => (
							<Grid item xs={12} sm={6} key={index}>
								<Card>
									<CardContent>
										<Typography variant="h6">{project.name}</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											sx={{ mb: 1 }}
										>
											{project.technologies.join(", ")}
										</Typography>
										<Typography variant="body1">
											{project.description}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Slide>
			</div>
		)}
	</InView>
);

export default ProjectsSummary;
