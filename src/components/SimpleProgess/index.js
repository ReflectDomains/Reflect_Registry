import { styled, LinearProgress, Box } from '@mui/material';
import { memo } from 'react';
const CustomLinearProgressOut = styled(LinearProgress)(({ value }) => ({
	width: '508px',
	height: '40px',
	borderRadius: '30px',
	background: 'transparent',
	'.MuiLinearProgress-bar': {
		borderRadius: '30px',
		background: 'transparent',
		'&::after': {
			position: 'absolute',
			content: value === 100 ? '"☺️"' : '"😃"',
			right: '-2px',
			top: '-5px',
			background: `transparent`,
			width: '40px',
			height: '60px',
			zIndex: 1,
			fontSize: '40px',
		},
	},
}));

const CustomLinearProgressInner = styled(LinearProgress)((theme) => ({
	position: 'absolute',
	top: '3px',
	left: '4px',
	width: '497px',
	height: '30px',
	borderRadius: '30px',
	background: '#F7F7F7',
	border: '2px solid #E2E2E2',
	'.MuiLinearProgress-bar': {
		background: 'linear-gradient(90deg, #7D66FF 0.63%, #40BF82 100%)',
		borderRadius: '30px',
		'&::after': {
			position: 'absolute',
			content: '""',
			right: '-10px',
			top: '-5px',
			background: `transparent`,
			width: '40px',
			height: '40px',
			zIndex: 1,
		},
	},
}));

const SimpleProgess = ({ progess }) => {
	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<CustomLinearProgressInner
				value={Number(progess)}
				variant="determinate"
			/>
			<CustomLinearProgressOut
				value={Number(progess) <= 0 ? 7 : Number(progess)}
				variant="determinate"
			/>
		</Box>
	);
};

export default memo(SimpleProgess);
