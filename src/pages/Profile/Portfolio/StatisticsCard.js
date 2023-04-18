import { Box, Paper, Typography, styled } from '@mui/material';
import { memo } from 'react';

const Wrapper = styled(Paper)(({ theme }) => ({
	borderRadius: '',
	padding: theme.spacing(3, 1),
	boxShadow:
		'10px 14px 28px -80px rgba(23, 12, 86, 0.02), 8px 0px 33px rgba(30, 21, 81, 0.05)',
	marginTop: theme.spacing(2),
}));

const Price = styled(Typography)(({ theme }) => ({
	fontWeight: 800,
	textAlign: 'center',
}));

const Des = styled(Typography)(({ theme }) => ({
	fontSize: '10px',
	textAlign: 'center',
	color: theme.color.mentionColor,
	marginTop: theme.spacing(0.5),
}));

const DataWrapper = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	gap: theme.spacing(1),
}));

const StatisticsCard = () => {
	return (
		<Wrapper>
			<DataWrapper spacing={1}>
				<Box>
					<Price>$836.54 USD</Price>
					<Des>Total cost to register subdomains</Des>
				</Box>
				<Box>
					<Price>156</Price>
					<Des>Number of owned domain names</Des>
				</Box>
			</DataWrapper>
		</Wrapper>
	);
};

export default memo(StatisticsCard);
