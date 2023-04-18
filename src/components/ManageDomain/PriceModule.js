import { memo } from 'react';
import SettingPart from './SettingPart';
import { Box, Stack, Switch, Typography, styled, Input } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';

const TitleText = styled(Typography)(() => ({
	fontSize: '16px',
	fontWeight: 800,
	color: '#333',
}));

const IconTips = styled(ErrorOutlineIcon)(() => ({
	color: '#333',
	fontSize: '20px',
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
	color: '#666',
	fontSize: '14px',
}));

const PriceModule = () => {
	return (
		<Stack direction="column">
			<ExpiryDate className="des">Expiry: 2025.02.21(XX days)</ExpiryDate>

			<TitleText sx={{ marginTop: '40px' }}>Pricing Module</TitleText>
			<SettingPart settingType={2} />

			<Box sx={{ mt: 4 }}>
				<TitleText>Token Airdrop Module(Coming soon)</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography>Module Switch:</Typography>
					<Switch />
					<IconTips />
				</Stack>
			</Box>
			<Box sx={{ mt: 4 }}>
				<TitleText>Invitation Module(Coming soon)</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography>Module Switch:</Typography>
					<Switch />
					<IconTips />
				</Stack>
			</Box>
			<Box sx={{ mt: 4 }}>
				<TitleText>DNS Subdomain Allocation</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Input sx={{ minWidth: 90, width: 90 }} disableUnderline={true} />
					<Typography>.reflect.io</Typography>
				</Stack>
			</Box>
			<Stack sx={{ mt: 6, mb: 3 }} direction="row" justifyContent="center">
				<LoadingButton variant="contained">Updata</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default memo(PriceModule);
