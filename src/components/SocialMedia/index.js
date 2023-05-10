import { Link, Stack, Tooltip, styled } from '@mui/material';
import { memo } from 'react';

// import { DiscordIcon, TwitterIcon, MediumIcon, TGIcon } from '../../assets';

import {
	DiscordIcon,
	TwitterIcon,
	MediumIcon,
	TGIcon,
} from '../../assets/index';

const SocialLink = styled(Link)(({ theme }) => ({
	svg: {
		width: '14px',
		height: '14px',
		color: '#666666',

		'&:hover': {
			color: theme.color.main,
		},
	},
}));

const SocialMedia = ({ discord, twitter, medium, telegram }) => {
	return (
		<Stack direction="row" justifyContent="center" spacing={1}>
			{discord ?? (
				<Tooltip title={discord} placement="top">
					<SocialLink>
						<DiscordIcon />
					</SocialLink>
				</Tooltip>
			)}
			{twitter ?? (
				<Tooltip title={twitter} placement="top">
					<SocialLink>
						<TwitterIcon />
					</SocialLink>
				</Tooltip>
			)}
			{medium ?? (
				<Tooltip title={medium} placement="top">
					<SocialLink>
						<MediumIcon />
					</SocialLink>
				</Tooltip>
			)}
			{telegram ?? (
				<Tooltip title={telegram} placement="top">
					<SocialLink>
						<TGIcon />
					</SocialLink>
				</Tooltip>
			)}
		</Stack>
	);
};

export default memo(SocialMedia);
