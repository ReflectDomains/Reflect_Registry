import { Stack, Typography, Popover } from '@mui/material';
import { memo, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircleStep from '../../components/CircleStep';
import { TypographySubtitle } from '.';

const StepAndCircleProcess = ({ step }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	return (
		<>
			<CircleStep step={step} total={3} />
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					mt: '10px',
					mb: '20px',
				}}
			>
				<TypographySubtitle
					sx={(theme) => ({
						fontSize: '16px',
						mr: theme.spacing(1),
					})}
				>
					{step === 1
						? 'Payment Token'
						: step === 2
						? 'Pending registration by reflect contract'
						: 'Setting Profile of Subname(Optional)'}
				</TypographySubtitle>
				{step === 2 ? (
					<ErrorOutlineIcon
						sx={(theme) => ({
							fontSize: '20px',
							color: theme.color.mentionColor,
						})}
						onClick={handleClick}
					/>
				) : null}
			</Stack>
			{/* info */}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Typography sx={{ p: 2, width: '200px' }}>
					The reflect contract will execute subdomain registration, the
					execution process needs to interact with the wallet serval
					times,please cooperate
				</Typography>
			</Popover>
		</>
	);
};

export default memo(StepAndCircleProcess);
