import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { InView } from "react-intersection-observer";
import { Slide } from "@mui/material";

const ProfilePicture = ({ profile }) => (
	<InView triggerOnce>
		{({ inView, ref }) => (
			<Box
				ref={ref}
				textAlign="center"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mb: 4,
				}}
			>
				<Slide in={inView} direction="down" timeout={500}>
					<Avatar
						src={profile.profilePicture}
						alt="Profile"
						sx={{
							width: { xs: 80, sm: 120 },
							height: { xs: 80, sm: 120 },
							mb: 2,
						}}
					/>
				</Slide>
				<Typography variant="h4">{profile.name}</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					{profile.title}
				</Typography>
			</Box>
		)}
	</InView>
);

export default ProfilePicture;
