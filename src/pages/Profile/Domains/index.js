import { Box, Input, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { memo, useCallback, useState } from 'react';
import CollapseItem from './CollapseItem';
const domainSetting = ['.city', '.bit', '.uni'];

const Domains = () => {
	const [selected, setSelected] = useState('');
	const onChangeSelect = useCallback((item) => {
		setSelected(item);
	}, []);
	return (
		<Stack direction="column">
			<Box
				sx={(theme) => ({
					marginTop: theme.spacing(2),
					textAlign: 'right',
				})}
			>
				<Input
					variant="filled"
					disableUnderline={true}
					placeholder="Search for top-level domain"
					endAdornment={
						<Button
							sx={{
								padding: '5px',
								minWidth: 'unset',
								height: 'unset',
								background: 'white',
							}}
						>
							<SearchIcon
								sx={(theme) => ({ color: theme.palette.primary.main })}
							/>
						</Button>
					}
				/>
			</Box>

			<Stack direction="row" justifyContent="flex-end"></Stack>
			{domainSetting.map((item) => (
				<CollapseItem
					key={item}
					item={item}
					selected={selected === item}
					onClick={onChangeSelect}
				/>
			))}
		</Stack>
	);
};

export default memo(Domains);
