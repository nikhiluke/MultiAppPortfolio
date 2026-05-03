import { Box, Fade, Typography, useMediaQuery } from "@mui/material";
import { InView } from "react-intersection-observer";
import { useTheme } from "@mui/material";

const CompanyTimeLine = ({ companies }) => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.down("md"));
	const CompanyTimeLineBox = (props) => {
		const { company, styleObj } = props;
		return (
			<Box
				sx={{
					padding: "5px",
					backgroundColor:
						theme.palette.mode === "dark"
							? theme.palette.grey[700]
							: theme.palette.primary.light,
					boxShadow: theme.shadows[15],
					color: "white",
					...styleObj,
				}}
			>
				<Typography variant="subtitle1">{company.name}</Typography>
				<Typography variant="subtitle1">{company.role}</Typography>
				<Typography variant="subtitle1">{company.years}</Typography>
			</Box>
		);
	};

	const TopTimeLineBox = (props) => (
		<Box
			sx={{
				position: { md: "relative" },
				bottom: { md: "-17px" },
				alignSelf: { md: "flex-end" },
			}}
		>
			<CompanyTimeLineBox
				company={props.company}
				styleObj={{
					"::after": {
						content: '""',
						position: "absolute",
						bottom: 24,
						marginLeft: "-5px",
						borderWidth: 10,
						borderStyle: "solid",
						borderColor: `${
							theme.palette.mode === "dark"
								? theme.palette.grey[700]
								: theme.palette.primary.light
						} transparent transparent transparent`,
					},
				}}
			/>
			<Box
				sx={{
					margin: { md: "10px 0" },
					width: "20px",
					height: "20px",
					borderRadius: "100px",
					backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#2C2C2C",
				}}
			/>
		</Box>
	);

	const BottomTimeLineBox = (props) => (
		<Box
			sx={{
				position: { md: "relative" },
				bottom: { md: "17px" },
				alignSelf: { md: "flex-start" },
			}}
		>
			<Box
				sx={{
					margin: { md: "10px 0" },
					width: "20px",
					height: "20px",
					borderRadius: "100px",
					backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#2C2C2C",
				}}
			/>
			<CompanyTimeLineBox
				company={props.company}
				styleObj={{
					"::before": {
						content: '""',
						position: "absolute",
						top: 24,
						marginLeft: "-5px",
						borderWidth: 10,
						borderStyle: "solid",
						borderColor: `transparent transparent ${
							theme.palette.mode === "dark"
								? theme.palette.grey[700]
								: theme.palette.primary.light
						} transparent`,
					},
				}}
			/>
		</Box>
	);

	const SideTimeLineBox = (props) => {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					marginLeft: "-7px",
				}}
			>
				<Box
					sx={{
						margin: { md: "10px 0" },
						width: "20px",
						height: "20px",
						borderRadius: "100px",
						backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#2C2C2C",
					}}
				/>
				<CompanyTimeLineBox
					company={props.company}
					styleObj={{
						minWidth: "250px",
						width: "60vw",
						borderRadius: "5px",
					}}
				/>
			</Box>
		);
	};
	return (
		<InView triggerOnce>
			{({ inView, ref }) => (
				<Box
					id="CompanyTimeLine"
					ref={ref}
					sx={{
						height: { xs: "100%", md: "300px" },
						margin: "32px 0",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Fade in={inView} timeout={500}>
						<Box
							sx={{
								marginLeft: { xs: "10px", md: "auto" },
								width: { xs: "5px", md: "100%" },
								height: { xs: "100%", md: "5px" },
								borderRadius: "50px",
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								gap: { xs: "50px", md: "auto" },
								justifyContent: "start",
								alignItems: { xs: "start", md: "unset" },
								position: "relative",
								backgroundColor:
									theme.palette.mode === "dark" ? "#fff" : "#2C2C2C",
							}}
						>
							{companies.reverse().map((company, index) => {
								if (isMd) {
									return <SideTimeLineBox company={company} key={index} />;
								} else {
									if (index % 2 === 0) {
										return <TopTimeLineBox company={company} key={index} />;
									} else {
										return <BottomTimeLineBox company={company} key={index} />;
									}
								}
							})}
						</Box>
					</Fade>
				</Box>
			)}
		</InView>
	);
};
export default CompanyTimeLine;
