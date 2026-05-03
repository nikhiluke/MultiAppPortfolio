import React from "react";
import { Card, CardContent, Typography, Fade } from "@mui/material";
import { InView } from "react-intersection-observer";

const CompaniesSummary = ({ companies }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<div ref={ref}>
				<Fade in={inView} timeout={500}>
					<div style={{ marginBottom: "1rem" }}>
						{companies.map((company, index) => (
							<Card sx={{ mb: 2 }} key={index}>
								<CardContent>
									<Typography variant="h6">{company.name}</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										{company.role} ({company.years})
									</Typography>
								</CardContent>
							</Card>
						))}
					</div>
				</Fade>
			</div>
		)}
	</InView>
);

export default CompaniesSummary;
