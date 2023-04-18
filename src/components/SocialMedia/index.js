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

const SocialMedia = () => {
	return (
		<Stack direction="row" justifyContent="center" spacing={1}>
			<Tooltip title="discord" placement="top">
				<SocialLink>
					<DiscordIcon />
				</SocialLink>
			</Tooltip>

			<Tooltip title="twitter" placement="top">
				<SocialLink>
					<TwitterIcon />
				</SocialLink>
			</Tooltip>

			<Tooltip title="medium" placement="top">
				<SocialLink>
					<MediumIcon />
				</SocialLink>
			</Tooltip>

			<Tooltip title="telegram" placement="top">
				<SocialLink>
					<TGIcon />
				</SocialLink>
			</Tooltip>
		</Stack>
	);
};

export default memo(SocialMedia);
