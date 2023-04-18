import { Stack, Box } from '@mui/material';
import { memo, useState } from 'react';
import { TypographyInfo } from '.';
import CommonAvatar from '../../components/CommonAvatar';
import avatar from '../../assets/images/avatar.png';
import { LoadingButton } from '@mui/lab';
import MultipleInput from '../../components/CommonUI/MultipleInput';

const LabelText = { fontSize: '16px', fontWeight: 500, mt: '30px' };

const StepThree = () => {
	const [inpVal, setInpVal] = useState();

	const handleChange = (e) => {
		const value = e.target.value;
		setInpVal(value);
	};

	return (
		<Box>
			<TypographyInfo
				sx={(theme) => ({
					fontWeight: 600,
					textAlign: 'left',
					mb: theme.spacing(1),
				})}
			>
				Avatar
			</TypographyInfo>
			<Stack direction="row" alignItems="center">
				<CommonAvatar avatar={avatar} scope={100} />
				<LoadingButton
					variant="outlined"
					sx={(theme) => ({
						color: theme.color.text,
						borderColor: 'rgba(0,0,0,0.1)',
						background: 'transparent',
						ml: theme.spacing(2),
					})}
				>
					Replace
				</LoadingButton>
			</Stack>
			<MultipleInput
				value={inpVal}
				label="Slogan"
				labelSx={LabelText}
				inputSx={{ fontSize: '16px' }}
				width={460}
				multiline
				rows={4}
				minRows={4}
				maxcounts={100}
				onChange={handleChange}
			/>
			<LoadingButton
				variant="outlined"
				sx={(theme) => ({
					backgroundColor: 'transparent',
					mt: theme.spacing(3),
					mb: theme.spacing(1),
				})}
			>
				Add more to profile
			</LoadingButton>
		</Box>
	);
};

export default memo(StepThree);
