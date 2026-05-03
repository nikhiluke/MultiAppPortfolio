import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grow,
	Paper,
	Typography,
} from "@mui/material";
import { InView } from "react-intersection-observer";

const ProfileAndSummary = (props) => {
	const { profile, summary } = props;
	return (
		<InView triggerOnce>
			{({ inView, ref }) => (
				<div ref={ref}>
					<Grow in={inView} timeout={500}>
						<Paper
							elevation={10}
							sx={{
								display: "flex",
								mb: 4,
								flexDirection: {
									xs: "column",
									md: "row",
								},
							}}
						>
							<Box
								ref={ref}
								textAlign="center"
								sx={{
									flex: 1,
									justifyItems: "center",
									padding: 4,
								}}
							>
								<Avatar
									src={profile.profilePicture}
									alt="Profile"
									variant="square"
									sx={{
										width: { xs: 250, sm: 450, md: 250 },
										height: { xs: 250, sm: 450, md: 250 },
										mb: 2,
									}}
								/>
								<Typography variant="h4">{profile.name}</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{profile.title}
								</Typography>
							</Box>
							<Box
								ref={ref}
								sx={{
									flex: 2,
									alignSelf: "center",
								}}
							>
								<Card>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											Resume Summary
										</Typography>
										<Typography variant="body1">{summary}</Typography>
									</CardContent>
								</Card>
							</Box>
						</Paper>
					</Grow>
				</div>
			)}
		</InView>
	);
};

export default ProfileAndSummary;
