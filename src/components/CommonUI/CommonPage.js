import { Box, Card, Link, Typography, styled } from '@mui/material';
import { memo } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const Title = styled(Typography)(() => ({
	fontSize: '32px',
	fontWeight: 800,
}));

const Content = styled(Card)(({ theme }) => ({
	position: 'relative',
	boxShadow: '0px 4px 34px -8px rgba(39, 23, 132, 0.2)',
	borderRadius: '30px',
	padding: theme.spacing(4),
	marginTop: theme.spacing(2),
	zIndex: 2,
}));

const TitleWrapper = styled(Link)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',

	svg: {
		color: theme.color.text,
		marginRight: theme.spacing(1),
		cursor: 'pointer',
	},
}));

const CommonPage = ({ title, children, sx, back }) => {
	const navigate = useNavigate();

	return (
		<Box
			sx={(theme) => ({
				padding: theme.spacing(2, 0, 6, 0),
			})}
		>
			<TitleWrapper
				underline="none"
				to={-1}
				component="button"
				onClick={() => {
					navigate(back);
				}}
			>
				{back && <ArrowBackIosIcon />}
				<Title>{title}</Title>
			</TitleWrapper>
			<Content sx={sx}>{children}</Content>
		</Box>
	);
};

export default memo(CommonPage);
