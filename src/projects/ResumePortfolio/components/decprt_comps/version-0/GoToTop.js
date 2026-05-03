import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Box, IconButton } from '@mui/material';
import style from './GoToTop.module.css';

const GoToTop = () => {
    return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<IconButton href="#" className={style.buttonAnimate}>
					<KeyboardDoubleArrowUpIcon
						sx={{
							fontSize: "50px",
						}}
					/>
				</IconButton>
			</Box>
		);
}

export default GoToTop