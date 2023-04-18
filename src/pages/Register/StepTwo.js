import { Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { TypographyInfo } from '.';
import SimpleProgess from '../../components/SimpleProgess';

const ContentBar = memo(({ leftText, rightText }) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={(theme) => ({
				width: '507px',
				height: '60px',
				borderRadius: '10px',
				mb: theme.spacing(1),
				backgroundColor: '#fff',
				padding: `0 ${theme.spacing(2)}`,
				boxSizing: 'border-box',
			})}
		>
			<TypographyInfo
				sx={() => ({
					color: '#666',
				})}
			>
				{leftText}
			</TypographyInfo>
			<TypographyInfo>{rightText}</TypographyInfo>
		</Stack>
	);
});

const StepTwo = () => {
	const [progess] = useState(100);
	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<TypographyInfo sx={{ fontWeight: 600, textAlign: 'center', mb: '15px' }}>
				{progess === 100
					? 'All Transactions Complete'
					: 'Payment Transcations Sent'}
			</TypographyInfo>
			<SimpleProgess progess={progess} />
			<Typography
				sx={(theme) => ({
					fontSize: '12px',
					width: '507px',
					color: theme.typography.subtitle1.color,
					fontWeight: 500,
					mt: '15px',
					mb: '20px',
					textAlign: 'left',
				})}
			>
				{progess === 100
					? '🎉🎉🎉Your transaction is now complete!'
					: 'Your transaction is now in progress, you can close this and come backlater.'}
			</Typography>
			<ContentBar
				leftText="Action1"
				rightText="Register subname by reflect contract"
			/>
			<ContentBar leftText="Action2" rightText="Pay token to domain owner" />
			<TypographyInfo sx={(theme) => ({ color: theme.color.main })}>
				View on Etherscan(Goerli Testnet)
			</TypographyInfo>
		</Stack>
	);
};

export default memo(StepTwo);
