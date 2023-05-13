import { Box, Stack, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useCallback, useMemo, useReducer, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import LastStep from './LastStep';
import StepAndCircleProcess from './StepAndCircleProcess';
import { useWaitForTransaction } from 'wagmi';
import moment from 'moment';

export const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
	fontSize: '20px',
	color: theme.typography.caption.color,
	fontWeight: 800,
	...sx,
}));

export const TypographyInfo = styled(Typography)(({ theme, sx }) => ({
	fontSize: '16px',
	color: theme.typography.caption.color,
	fontWeight: 500,
	...sx,
}));

const initState = {
	paySuccess: '', // pending success fail
	years: 1,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setPaySuccess':
			return { ...state, paySuccess: action.payload };
		case 'setHash':
			return { ...state, txHash: action.payload };
		case 'setYears':
			return { ...state, years: action.payload };
		default:
			return { ...state };
	}
};

const Register = () => {
	const [state, dispatch] = useReducer(reducer, initState);
	const params = useParams();
	const [step, setStep] = useState(1);

	const nextPage = useCallback(() => {
		if (step + 1 <= 4) {
			setStep(parseInt(step + 1));
		}
	}, [step]);

	const backToAfterStep = useCallback(() => {
		if (step - 1 > 0) {
			setStep(parseInt(step - 1));
		}
	}, [step]);

	const { isLoading, isError } = useWaitForTransaction({
		hash: state?.txHash,
		onSuccess: () => {
			dispatch({ type: 'setPaySuccess', payload: 'success' });
		},
		onError: () => {
			dispatch({ type: 'setPaySuccess', payload: 'fail' });
		},
	});

	const expiryData = useMemo(
		() => new moment().add(1, 'year').format('YYYY-MM-DD'),
		[]
	);

	const days = useMemo(() => parseInt(state.years * 365), [state.years]);

	return (
		<Box>
			<CommonPage title="Registration">
				<TypographySubtitle>Basic Info</TypographySubtitle>
				<TypographyInfo sx={{ mt: '10px' }}>
					Subname: {params?.name}
				</TypographyInfo>
				<TypographyInfo sx={{ mt: '10px' }}>
					Expiry:until {expiryData} ({days} days)
				</TypographyInfo>
				<TypographySubtitle sx={{ marginTop: '30px' }}>
					Process
				</TypographySubtitle>
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: '10px',
					}}
				>
					{step < 4 ? <StepAndCircleProcess step={step} /> : <LastStep />}
				</Stack>
				<Box
					sx={{
						backgroundColor: step < 4 ? '#F7F7F7' : '#fff',
						borderRadius: '10px',
						padding: '20px',
					}}
				>
					{step === 1 ? (
						<StepOne onNext={nextPage} dispatch={dispatch} />
					) : step === 2 ? (
						<StepTwo state={state} dispatch={dispatch} />
					) : step === 3 ? (
						<StepThree />
					) : null}
				</Box>
				{step < 4 ? (
					<Stack
						flexDirection="row"
						justifyContent="center"
						sx={{ mt: '20px' }}
					>
						{step > 1 ? (
							<>
								<LoadingButton
									variant="outlined"
									onClick={backToAfterStep}
									sx={(theme) => ({
										mr: theme.spacing(2),
									})}
									disabled={isError}
								>
									Back
								</LoadingButton>
								<LoadingButton
									loading={isLoading}
									variant="contained"
									onClick={nextPage}
								>
									Next
								</LoadingButton>
							</>
						) : null}
					</Stack>
				) : null}
			</CommonPage>
		</Box>
	);
};

export default memo(Register);
