import { Box, styled, Typography } from '@mui/material';
import { memo } from 'react';

const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	backgroundColor: theme.color.backColor,
	borderRadius: theme.spacing(1),
	padding: theme.spacing(0.5),
}));

const SwitchItem = styled(Typography)(({ theme, ...props }) => ({
	padding: theme.spacing(0.3, 1),
	borderRadius: theme.spacing(1),
	color:
		props.label === props.value
			? theme.palette.black.contrastText
			: theme.palette.black.main,
	backgroundColor:
		props.label === props.value ? theme.palette.black.main : 'transparent',
	cursor: 'pointer',
}));

const SwitchButton = ({ ...props }) => {
	const { onChange, value } = props;

	return (
		<Wrapper>
			<SwitchItem
				label="domain"
				value={value}
				onClick={() => {
					onChange('domain');
				}}
			>
				Subname Sale Overview
			</SwitchItem>
			<SwitchItem
				label="subdomain"
				value={value}
				onClick={() => {
					onChange('subdomain');
				}}
			>
				Bought Subname
			</SwitchItem>
		</Wrapper>
	);
};

export default memo(SwitchButton);
