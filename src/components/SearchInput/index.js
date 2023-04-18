import {
	Box,
	Collapse,
	Input,
	List,
	ListItem,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import { memo, useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const SearchWrapper = styled(Box)(() => ({
	width: '600px',
	margin: '60px auto 0',
}));

const Search = styled(Input)(({ theme }) => ({
	width: '100%',
	height: '44px',
	border: 'none',
	background: '#fff',
	borderRadius: '10px',
	':hover,': {
		border: 'none',
	},

	'&.Mui-focused': {
		border: 'none',
	},
}));

const ClearButton = styled(CloseIcon)(() => ({
	fontSize: '24px',
	cursor: 'pointer',
}));

const PopoverList = styled(List)(({ theme }) => ({
	background: '#fff',
	borderRadius: theme.spacing(1),
	marginTop: theme.spacing(1),
}));

const PopoverListItem = styled(ListItem)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	cursor: 'pointer',
}));

const ListItemTitle = styled(Typography)(() => ({
	fontWeight: 800,
}));

const RegisterStatus = styled(Box)(({ theme, ...props }) => ({
	borderRadius: '50px',
	backgroundColor:
		props.status === 'Registered'
			? theme.color.success + '1a'
			: props.status === 'Available'
			? theme.color.main + '1a'
			: theme.color.error + '1a',

	color:
		props.status === 'Registered'
			? theme.color.success
			: props.status === 'Available'
			? theme.color.main
			: theme.color.error,
	padding: theme.spacing(0.5, 1),
	fontSize: '14px',
	fontWeight: 700,
}));

const list = [
	{
		name: 'Registered.reflect.eth',
		status: 'Registered',
	},
	{
		name: 'Available.reflect.eth',
		status: 'Available',
	},

	{
		name: 'Unsupported.reflect.eth',
		status: 'Unsupported',
	},
];

const SearchInput = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState();
	const [isFocus, setFocus] = useState(false);

	const handleChange = useCallback((e) => {
		const value = e.target.value;
		setSearchValue(value);
	}, []);

	const clearSearchValue = useCallback(() => {
		setSearchValue('');
	}, []);

	return (
		<SearchWrapper>
			<Search
				value={searchValue}
				placeholder="Search for top-level domain/domain name"
				disableUnderline={true}
				startAdornment={<SearchIcon sx={{ marginRight: '10px' }} />}
				endAdornment={
					searchValue ? (
						<ClearButton
							onClick={() => {
								clearSearchValue();
							}}
						/>
					) : null
				}
				onChange={handleChange}
				onFocus={() => {
					setFocus(true);
				}}
				onBlur={() => {
					setTimeout(() => {
						setFocus(false);
					}, [200]);
				}}
			/>

			<Collapse in={isFocus}>
				<PopoverList>
					{list.map((item, index) => (
						<PopoverListItem
							key={item.name}
							onClick={() => {
								console.log(item.status, 'status');
								if (item.status === 'Available') {
									console.log(item.status, 'navigate');
									navigate(`/register/${item.name}`);
								}
							}}
						>
							<ListItemTitle>{item.name}</ListItemTitle>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								spacing={1}
							>
								<RegisterStatus status={item.status}>
									{item.status}
								</RegisterStatus>
								<ChevronRightIcon
									sx={(theme) => ({ color: theme.color.mentionColor })}
								/>
							</Stack>
						</PopoverListItem>
					))}
				</PopoverList>
			</Collapse>
		</SearchWrapper>
	);
};

export default memo(SearchInput);
