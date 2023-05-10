import { memo, useCallback, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Stack,
	Typography,
	styled,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { TypographyInfo } from './index';
import { PlusIcon, RemoveIcon } from '../../assets';
import useApprove from '../../hooks/useApprove';
import { tokenForContract } from '../../config/profilePageSetting';
import { useParams } from 'react-router-dom';
import { useContractRead } from 'wagmi';
import { baseRegistrarImplementationABI, registerABI } from '../../config/ABI';
import {
	BaseRegistrarImplementation,
	registerContract,
} from '../../config/contract';
import { ensHashName } from '../../utils';
import useWriteApprove from '../../hooks/useWriteApprove';

const TypographyDes = styled(Typography)(({ theme, sx }) => ({
	color: theme.color.mentionColor,
	fontSize: '14px',
	marginBottom: '10px',
	...sx,
}));

const Radio999 = styled(Radio)(({ theme }) => ({
	color: theme.color.mentionColor,
}));

const ControlYears = styled(Box)(({ theme }) => ({
	width: '200px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: theme.spacing(1),
	border: '1px solid #0000001A',
	borderRadius: '50px',
	padding: theme.spacing(0.2),
	marginTop: theme.spacing(2),
	svg: {
		fontWeight: 400,
		fontSize: '44px',
		cursor: 'pointer',
		color: 'white',
		'&:active': {
			color: '#2f73da1a',
		},
	},
}));

const Years = styled(Typography)(() => ({
	fontSize: '20px',
}));

const StyledFormControlLabel = styled((props) => (
	<Box
		sx={{
			border: '2px solid #999',
			borderRadius: '10px',
			mr: '10px',
			pl: '10px',
			background: `${
				props.checked ? 'rgba(47, 115, 218, 0.1);' : 'transparent'
			}`,
		}}
	>
		<FormControlLabel {...props} />
	</Box>
))(({ checked }) => ({
	'.MuiFormControlLabel-label': {
		backgroundColor: 'trasparent',
		color: checked ? '#333' : '#999',
	},
}));

const StepOne = ({ nextPage }) => {
	const params = useParams();

	const [checked, setChecked] = useState('usdt');
	const [isPaid, setIsPaid] = useState(false);
	const [years, setYears] = useState(1);

	const { isApprove, setIsApprove } = useApprove([tokenForContract['USDT']]);

	const approveSuccess = useCallback(() => {
		setIsApprove(true);
	}, [setIsApprove]);

	const { approve, loading } = useWriteApprove({
		tokenAddress: tokenForContract['USDT'],
		onSuccess: approveSuccess,
	});
	const { topDomain, secondDomain } = useMemo(() => {
		return {
			topDomain: params?.name?.split('.')?.[1],
			secondDomain: params?.name?.split('.')?.[0],
		};
	}, [params]);
	const btnLoading = useMemo(() => loading, [loading]);

	const durationSeoncd = useMemo(() => years * 365 * 24 * 60, [years]);
	console.log(
		[
			secondDomain,
			ensHashName(topDomain),
			durationSeoncd,
			tokenForContract['USDT'],
		],
		'args'
	);

	const { data: rentPrice } = useContractRead({
		abi: registerABI,
		address: registerContract,
		args: [
			secondDomain,
			ensHashName(topDomain),
			durationSeoncd,
			tokenForContract['USDT'],
		],
	});
	console.log(rentPrice, 'rentPrice');

	const changeRadio = useCallback((e) => {
		setChecked(e.target.value);
	}, []);

	const approveOrPay = useCallback(() => {
		if (!isApprove) {
			approve();
		} else {
			// paid
			nextPage();
		}
	}, [isApprove, approve, nextPage]);
	return (
		<>
			<TypographyInfo sx={{ mb: '10px' }}>Supported Tokens:</TypographyInfo>
			<RadioGroup row onChange={changeRadio}>
				<StyledFormControlLabel
					value="usdt"
					label="10 USDT"
					checked={checked === 'usdt'}
					control={<Radio999 />}
				/>
				<StyledFormControlLabel
					value="usdc"
					disabled
					label="10 USDC"
					checked={checked === 'usdc'}
					control={<Radio999 />}
				/>
			</RadioGroup>

			<ControlYears>
				<RemoveIcon
					onClick={() => {
						setYears((v) => {
							if (v !== 0) {
								return v - 1;
							}
							return 0;
						});
					}}
				/>
				<Years>{years} Years</Years>
				<PlusIcon
					onClick={() => {
						setYears((v) => {
							return v + 1;
						});
					}}
				/>
			</ControlYears>

			<TypographyDes sx={{ mt: '30px' }}>
				-Registration fee:10 {checked?.toUpperCase()}
			</TypographyDes>
			<TypographyDes>-Est.network fee:0.0437ETH </TypographyDes>
			<TypographyDes>
				-Estimated total:0.0437ETH+10 {checked?.toUpperCase()}{' '}
			</TypographyDes>
			<TypographyDes sx={{ mb: '30px' }}>
				-2.5%service fees is included
			</TypographyDes>
			{isPaid ? (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={(theme) => ({ mb: theme.spacing(2) })}
				>
					<TypographyInfo
						sx={(theme) => ({
							color: theme.color.success,
							fontWeight: 800,
							mr: theme.spacing(1),
						})}
					>
						Paid
					</TypographyInfo>
					<CheckCircleRoundedIcon
						sx={(theme) => ({
							color: theme.color.success,
							fontSize: '15px',
						})}
					/>
				</Stack>
			) : (
				<LoadingButton
					loading={btnLoading}
					variant="contained"
					onClick={approveOrPay}
				>
					{isApprove ? `pay 10 ${checked}` : 'Approve'}
				</LoadingButton>
			)}
		</>
	);
};

export default memo(StepOne);
