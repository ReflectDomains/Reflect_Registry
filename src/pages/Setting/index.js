import { useForm } from 'react-hook-form';
import CommonPage from '../../components/CommonUI/CommonPage';
import LabelInput from '../../components/CommonUI/LabelInput';
import { useCallback, useState } from 'react';
import MultipleInput from '../../components/CommonUI/MultipleInput';
import { InputLabel, Stack } from '@mui/material';
import AvatarInput from '../../components/CommonUI/AvatarInput';
import { LoadingButton } from '@mui/lab';

const LabelText = { fontSize: '20px', fontWeight: 600 };

const Setting = () => {
	const { handleSubmit } = useForm();
	const [avatar, setAvatar] = useState();
	const [inpVal, setInpVal] = useState();

	const handleChange = (e) => {
		const value = e.target.value;
		setInpVal(value);
	};

	const handleUploadAvatarSuccess = useCallback((inputRef, img) => {
		setAvatar(img);
		inputRef.current.value = '';
	}, []);

	const handleUploadAvatarError = useCallback((inputRef) => {
		console.log('upload avatar failed');
		inputRef.current.value = '';
	}, []);

	return (
		<CommonPage title="Settings">
			<form onSubmit={handleSubmit(console.log)}>
				<Stack direction="column" spacing={3}>
					<AvatarInput
						label="Avatar"
						avatar={avatar}
						labelSx={LabelText}
						onSuccess={handleUploadAvatarSuccess}
						onError={handleUploadAvatarError}
					/>
					<MultipleInput
						value={inpVal}
						label="Slogan"
						labelSx={LabelText}
						multiline
						rows={4}
						minRows={4}
						maxcounts={100}
						onChange={handleChange}
					/>

					{/* Social Media */}
					<Stack direction="column" spacing={2}>
						<InputLabel sx={{ ...LabelText }}>Social Media</InputLabel>

						<LabelInput label="-Twitter" placeholder="@" />

						<LabelInput label="-Discord" placeholder="https:" />

						<LabelInput label="-Medium" placeholder="https:" />
						<LabelInput label="-Telegram" placeholder="@" />
					</Stack>

					<Stack
						direction="row"
						justifyContent="center"
						spacing={2}
						sx={(theme) => ({
							padding: theme.spacing(2, 0, 2, 0),
						})}
					>
						<LoadingButton loading={true} loadingPosition="start">
							Reset
						</LoadingButton>
						<LoadingButton
							loading={true}
							variant="contained"
							loadingPosition="start"
							onClick={() => {
								handleSubmit(console.log);
							}}
						>
							Save
						</LoadingButton>
					</Stack>
				</Stack>
			</form>
		</CommonPage>
	);
};

export default Setting;
