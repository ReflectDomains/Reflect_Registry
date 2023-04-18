import { Stack } from '@mui/material';
import { memo } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TypographyInfo } from '.';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const LastStep = () => {
	const navigate = useNavigate();

	return (
		<Stack direction="column" alignItems="center">
			<CheckCircleIcon
				sx={(theme) => ({
					color: theme.color.success,
					fontSize: '60px',
				})}
			/>
			<TypographyInfo
				sx={(theme) => ({
					fontWeight: 800,
					mt: theme.spacing(1),
					mb: theme.spacing(6),
				})}
			>
				Complete
			</TypographyInfo>
			<LoadingButton
				variant="outlined"
				sx={{ background: 'transparent' }}
				onClick={() => {
					navigate('/profile');
				}}
			>
				View my Subname
			</LoadingButton>
		</Stack>
	);
};

export default memo(LastStep);
