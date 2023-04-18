import { Collapse, Box, Stack, Typography, styled } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PriceModule from '../../../components/ManageDomain/PriceModule';

const ExpiryDate = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
}));

const CollapseItem = ({ item, selected, onClick }) => {
	const [show, setShow] = useState(false);
	const hiddenDomain = useCallback(() => {
		setShow(false);
	}, []);

	const chooseDomain = useCallback(() => {
		setShow(true);
		onClick && onClick(item);
	}, [onClick, item]);

	return (
		<Box
			sx={(theme) => ({
				padding: `0 ${theme.spacing(2)}`,
				backgroundColor: show && selected ? '#F2F4F5' : '#fff',
				mt: 2,
				borderRadius: '10px',
				'&:hover': {
					background: '#F2F4F5',
				},
			})}
		>
			<Stack
				key={item}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{
					height: '60px',
					backgroundColor: show && selected ? '#F2F4F5' : '#fff',
					'&:hover': {
						background: '#F2F4F5',
					},
				}}
			>
				<Typography
					sx={{
						fontSize: show && selected ? '26px' : '16px',
						fontWeight: show && selected ? 800 : 600,
						transition: 'all 0.3s',
					}}
				>
					{item}
				</Typography>

				{show && selected ? (
					''
				) : (
					<ExpiryDate className="des">Expiry: 2025.02.21(XX days)</ExpiryDate>
				)}

				{show && selected ? (
					<Box
						onClick={hiddenDomain}
						sx={{ cursor: 'pointer', padding: '0 20px' }}
					>
						<KeyboardArrowUpIcon />
					</Box>
				) : (
					<Typography
						onClick={chooseDomain}
						color="primary"
						sx={{ cursor: 'pointer' }}
					>
						Management
					</Typography>
				)}
			</Stack>

			<Collapse in={show && selected}>
				<PriceModule />
			</Collapse>
		</Box>
	);
};

export default memo(CollapseItem);
