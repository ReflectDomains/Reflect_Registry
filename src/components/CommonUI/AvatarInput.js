import { useAccount } from 'wagmi';
import CommonAvatar from '../CommonAvatar';
import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, Stack } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { getUploadOSSUrl, uploadAvatar } from '../../api/profile';
import { toast } from 'react-toastify';

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

	const handleUpload = useCallback(async ({ file, type }) => {
		try {
			const ossResp = await getUploadOSSUrl({ content_type: type });
			if (ossResp?.code === 0 && ossResp?.data) {
				await uploadAvatar({ url: ossResp.data.url, file });
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}, []);

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

				try {
					//upload image
					const res = await handleUpload({ file, type });

					if (res) {
						onSuccess(inputRef, imgURL, file);
					}
				} catch (error) {
					toast.error('upload fail');
					onError(inputRef);
					setUploading(false);
				} finally {
					setUploading(false);
				}
			}
		},
		[onSuccess, onError, handleUpload]
	);

	return (
		<Box>
			<InputLabel sx={labelSx}>{label}</InputLabel>
			<Stack direction="row" alignItems="center" spacing={2} mt={1}>
				<CommonAvatar avatar={avatar} scope={100} address={address} />
				<LoadingButton component="label" loading={uploading}>
					Replace
					<input
						hidden
						accept="image/jpeg,image/png"
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
