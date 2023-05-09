import { LoadingButton } from '@mui/lab';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { memo, useCallback, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useSigner } from 'wagmi';
import { splitAddress } from '../../utils';
import { ProfileIcon, ExitIcon } from '../../assets';
import { ListItemText, Menu, MenuItem, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonAvatar from '../CommonAvatar';
import { login } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const WalletItem = styled(MenuItem)(({ theme }) => ({
	...theme.typography.caption,
	svg: {
		paddingRight: theme.spacing(1),
	},
}));

const ConnectWallet = () => {
	const { openConnectModal } = useConnectModal();
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAccount();
	const { data: singer, isLoading, isSuccess } = useSigner();

	const dispatch = useDispatch();

	const { profileInfo } = useSelector((state) => ({
		profileInfo: state.reflect_loginInfo,
	}));

	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleClickProfile = () => {
		navigate('/profile');
		handleClose();
	};

	const disconnectWallet = useCallback(() => {
		disconnect();
		handleClose();
		dispatch({ type: 'LOGOUT' });
	}, [dispatch, disconnect, handleClose]);

	const handleLogin = useCallback(
		async (singer) => {
			try {
				if (singer?._isSigner) {
					const signInfo = await singer.signMessage(address);
					console.log('signInfo:', signInfo);
					const resp = await login({
						address: address,
						message: address,
						signature: signInfo,
					});
					if (resp?.code === 0 && resp?.data && resp.data.access_token) {
						dispatch({ type: 'SET_TOKEN', value: resp.data.access_token });
						dispatch({ type: 'SET_PRE_ACCOUNT', value: address });
					}
					console.log('loginResp:', resp);
				}
			} catch (error) {
				console.log('error:', error);
				if (
					error?.code === 4001 &&
					error.message.includes('User denied message signature')
				) {
					toast.error(error.message);
				}
				disconnectWallet();
			}
		},
		[address, disconnectWallet, dispatch]
	);

	useEffect(() => {
		if (singer && isSuccess && !isLoading && isConnected) {
			singer.getAddress().then((_account) => {
				if (_account !== profileInfo.preAccount) handleLogin(singer);
			});
		}
		// eslint-disable-next-line
	}, [isConnected, singer, isSuccess, isLoading]);

	return (
		<div>
			{openConnectModal && (
				<LoadingButton
					variant="contained"
					shape="round"
					onClick={() => {
						openConnectModal();
					}}
				>
					Connect Wallet!
				</LoadingButton>
			)}

			{address && (
				<LoadingButton
					id="wallet-menu"
					shape="round"
					startIcon={
						<CommonAvatar
							scope={24}
							address={address}
							avatar={profileInfo.avatar}
						/>
					}
					aria-controls={open ? 'wallet-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					{splitAddress(address)}
				</LoadingButton>
			)}
			<Menu
				id="wallet-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				sx={(theme) => ({ marginTop: theme.spacing(1) })}
			>
				<WalletItem onClick={handleClickProfile}>
					<ProfileIcon />
					<ListItemText>Profile</ListItemText>
				</WalletItem>
				<WalletItem onClick={disconnectWallet}>
					<ExitIcon />
					<ListItemText>Disconnect</ListItemText>
				</WalletItem>
			</Menu>
		</div>
	);
};

export default memo(ConnectWallet);
