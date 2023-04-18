import { useAccount } from 'wagmi';
import CommonAvatar from '../CommonAvatar';
import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, Stack } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

const AvatarInput = ({
	label,
	labelSx,
	avatar,
	onSuccess,
	onError,
	...props
}) => {
	const { address } = useAccount();
	const inputRef = useRef(null);
	const [uploading, setUploading] = useState(false);

	const onFileChange = useCallback(
		async (event) => {
			const file = event.target.files[0];

			if (file) {
				// upload file
				const size = file.size;
				if (size / (1024 * 1024) > 2) {
					// exceed image size
					return;
				}
				setUploading(true);
				const type = file.type;
				const URL = window.URL || window.webkitURL;
				const imgURL = URL.createObjectURL(file);

				console.log('imgURL:', imgURL);
				console.log('type:', type);
				//upload image
				// const res = await uploadToIpfs(file, type, false);

				if (imgURL) {
					onSuccess(inputRef, imgURL);
				} else {
					onError(inputRef);
				}
				setUploading(false);
			}
			setUploading(false);
		},
		[onSuccess, onError]
	);

	return (
		<Box>
			<InputLabel sx={labelSx}>{label}</InputLabel>
			<Stack direction="row" alignItems="center" spacing={2} mt={1}>
				<CommonAvatar scope={100} avatar={avatar} address={address} />
				<LoadingButton component="label" loading={uploading}>
					Replace
					<input
						hidden
						accept="image/*"
						type="file"
						name="avatar"
						id="icon-button-file"
						ref={inputRef}
						onChange={onFileChange}
					/>
				</LoadingButton>
			</Stack>
		</Box>
	);
};

export default AvatarInput;
