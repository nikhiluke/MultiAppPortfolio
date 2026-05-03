import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const HeaderBar = (props) => {
	const { darkMode, setDarkMode } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const LinkButton = (props) => {
		const { href, children } = props;
		return (
			<Button
				sx={{
					color: "white",
					padding: "10px",
					margin: 0,
					":hover": {
						backgroundColor: "rgba(0,0,0,0.5)",
					},
				}}
				href={href}
			>
				{children}
			</Button>
		);
	};
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						gap: "20px",
						justifyContent: {
							xs: "space-between",
							md: "flex-end",
						},
					}}
				>
					<IconButton
						sx={{
							display: {
								xs: "block",
								md: "none",
							},
						}}
					>
						<IconButton onClick={handleClick}>
							<MenuIcon />
						</IconButton>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem onClick={handleClose}>
								<LinkButton href="#CompanyTimeLine">Experince</LinkButton>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<LinkButton href="#ProjectSummary">Projects</LinkButton>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<LinkButton href="#SkillSummary">Skills</LinkButton>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<LinkButton href="#ToolsSummary">Tools</LinkButton>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<LinkButton href="#EducationSummary">Education</LinkButton>
							</MenuItem>
						</Menu>
					</IconButton>

					<Box
						sx={{
							alignItems: "center",
							gap: "10px",
							display: {
								xs: "none",
								md: "flex",
							},
						}}
					>
						<ToggleButtonGroup
							value={darkMode}
							exclusive
							onChange={() => setDarkMode(!darkMode)}
							aria-label="Set Theme"
						>
							<ToggleButton value={false} aria-label="Light Theme">
								<LightModeOutlinedIcon />
							</ToggleButton>
							<ToggleButton value={true} aria-label="Dark Theme">
								<DarkModeOutlinedIcon />
							</ToggleButton>
						</ToggleButtonGroup>
						<LinkButton href="#CompanyTimeLine">Experince</LinkButton>
						<LinkButton href="#ProjectSummary">Projects</LinkButton>
						<LinkButton href="#SkillSummary">Skills</LinkButton>
						<LinkButton href="#ToolsSummary">Tools</LinkButton>
						<LinkButton href="#EducationSummary">Education</LinkButton>
						<LinkButton>Contact</LinkButton>
					</Box>
					<Button variant="contained" href="NikhilUkeResume.pdf" download>
						Donwload Resume
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
