import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import {
	useAccount,
	useContract,
	useContractRead,
	useFeeData,
	useProvider,
	useToken,
} from 'wagmi';
import { baseRegistrarImplementationABI, registerABI } from '../../config/ABI';
import {
	baseRegistrarImplementationContract,
	registerContract,
} from '../../config/contract';
import { ensHashName } from '../../utils';
import useWriteApprove from '../../hooks/useWriteApprove';
import { formatUnitsWitheDecimals } from '../../utils';
import { BigNumber } from 'ethers';
import useWriteContract from '../../hooks/useWriteContract';

const secondForYears = BigNumber.from(31536000);

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

const StepOne = ({ onNext, dispatch }) => {
	const params = useParams();
	const { address } = useAccount();

	const [checked, setChecked] = useState('usdt');
	const [years, setYears] = useState(1);

	const { data: tokenData } = useToken({ address: tokenForContract['USDT'] });
	const decimals = useMemo(() => tokenData?.decimals, [tokenData]);

	const { isApprove, setIsApprove, readLoading } = useApprove([
		tokenForContract['USDT'],
	]);

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

	const { data: nameExpires } = useContractRead({
		abi: baseRegistrarImplementationABI,
		address: baseRegistrarImplementationContract,
		functionName: 'nameExpires',
		args: [ensHashName(topDomain)],
	});

	const btnLoading = useMemo(
		() => loading || readLoading,
		[loading, readLoading]
	);

	const durationSeoncd = useMemo(() => {
		return BigNumber.from(years).mul(secondForYears).toString();
	}, [years]);

	const { data: available } = useContractRead({
		abi: registerABI,
		address: registerContract,
		functionName: 'available',
		args: [secondDomain, topDomain],
	});

	const { data: rentPriceArry } = useContractRead({
		abi: registerABI,
		address: registerContract,
		functionName: 'rentPrice',
		args: [
			secondDomain,
			ensHashName(topDomain),
			durationSeoncd,
			tokenForContract['USDT'],
		],
	});

	const price = useMemo(
		() =>
			formatUnitsWitheDecimals(rentPriceArry?.[0].toString() || 0, decimals),
		[rentPriceArry, decimals]
	);

	const [fee, setFee] = useState(0);

	const { data: gasPrice } = useFeeData();
	const provide = useProvider();
	const contract = useContract({
		address: registerContract,
		abi: registerABI,
		signerOrProvider: provide,
	});

	const args = useMemo(() => {
		return [
			secondDomain,
			topDomain,
			address,
			durationSeoncd,
			tokenForContract['USDT'],
		];
	}, [secondDomain, topDomain, address, durationSeoncd]);

	const getGas = useCallback(async () => {
		try {
			const estimateGas = await contract.estimateGas.register(...args, {
				from: address,
			});
			setFee(estimateGas.toString());
		} catch (error) {
			console.log(error, 'gas');
		}
	}, [contract, args, address]);

	const estFee = useMemo(() => {
		if (!gasPrice) return 0;
		const {
			formatted: { gasPrice: price },
		} = gasPrice;
		const mul = price * fee;
		return mul > 0 ? formatUnitsWitheDecimals(mul.toString(), 18) : 0;
	}, [fee, gasPrice]);

	const setTxHash = useCallback(
		(hash) => {
			dispatch({ type: 'setHash', payload: hash });
		},
		[dispatch]
	);

	const { write, prepareSuccess, writeStartSuccess } = useWriteContract({
		functionName: 'register',
		args: [...args],
		enabled: available && isApprove,
		setTxHash: setTxHash,
	});

	const changeRadio = useCallback((e) => {
		setChecked(e.target.value);
	}, []);

	const approveOrPay = useCallback(() => {
		if (!isApprove) {
			approve();
		} else {
			dispatch({ type: 'setPaySuccess', payload: 'pending' });
			write?.();
		}
	}, [isApprove, approve, write]);

	useEffect(() => {
		if (prepareSuccess && available) {
			getGas();
		}
	}, [getGas, prepareSuccess, available]);

	useEffect(() => {
		if (writeStartSuccess) {
			onNext?.();
		}
	}, [writeStartSuccess, onNext]);

	return (
		<>
			<TypographyInfo sx={{ mb: '10px' }}>Supported Tokens:</TypographyInfo>
			<RadioGroup row onChange={changeRadio}>
				<StyledFormControlLabel
					value="usdt"
					label={`${price} USDT`}
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
				-Registration fee:{price} {checked?.toUpperCase()}
			</TypographyDes>
			<TypographyDes>-Est.network fee:{estFee}ETH </TypographyDes>
			<TypographyDes>
				-Estimated total:{estFee}ETH+{price} {checked?.toUpperCase()}{' '}
			</TypographyDes>
			<TypographyDes sx={{ mb: '30px' }}>
				-2.5%service fees is included
			</TypographyDes>
			{!available ? (
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
					disabled={!available}
				>
					{isApprove ? `pay ${price} ${checked}` : 'Approve'}
				</LoadingButton>
			)}
		</>
	);
};

export default memo(StepOne);
