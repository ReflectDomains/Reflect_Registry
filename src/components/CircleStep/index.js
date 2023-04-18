import { Box, Stack, CircularProgress } from '@mui/material';
import { memo, useMemo } from 'react';

const CircleStep = ({ step = 1, total = 1 }) => {
	const stepProgess = useMemo(
		() => ((100 / total) * step).toFixed(2),
		[step, total]
	);
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={() => ({
				position: 'relative',
				width: 60,
				height: 60,
				textAlign: 'center',
				borderRadius: '50%',
			})}
		>
			<CircularProgress
				sx={(theme) => ({
					color: theme.color.backColor,
					position: 'absolute',
					top: 0,
					left: 0,
				})}
				variant="determinate"
				size={60}
				value={100}
			/>
			<CircularProgress
				sx={(theme) => ({
					color: theme.color.success,
					position: 'absolute',
					left: 0,
					top: 0,
				})}
				size={60}
				variant="determinate"
				value={Number(stepProgess)}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '6px',
					left: '6px',
					width: 48,
					height: 48,
					background: '#fff',
					borderRadius: '50%',
					color: '#333',
					fontSize: 16,
					textAlign: 'center',
					lineHeight: '48px',
				}}
			>
				{step}/ {total}
			</Box>
		</Stack>
	);
};

export default memo(CircleStep);
