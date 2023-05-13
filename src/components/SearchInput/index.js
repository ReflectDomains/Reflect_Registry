import {
	Box,
	Collapse,
	Input,
	List,
	ListItem,
	Stack,
	Typography,
	styled,
	CircularProgress,
} from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useContractRead } from 'wagmi';
import { registerABI, tldABI } from '../../config/ABI';
import { registerContract, tldContract } from '../../config/contract';
import { debounce, ensHashName, isDomainRegex, zeroAddress } from '../../utils';

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

const SearchInput = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const [isFocus, setFocus] = useState(false);

	const [searchName, setSearchName] = useState('');

	const validName = useMemo(() => {
		return isDomainRegex(searchName);
	}, [searchName]);

	const { data, tldLoading } = useContractRead({
		functionName: 'getTldToOwner',
		args: [ensHashName(searchName.split('.')[1])],
		address: tldContract,
		abi: tldABI,
		enabled: searchName && validName,
	});

	const { data: available, isLoading } = useContractRead({
		abi: registerABI,
		address: registerContract,
		functionName: 'available',
		args: [searchName.split('.')[0], searchName.split('.')[1]],
		enabled: validName && data,
		cacheOnBlock: true,
	});

	// eslint-disable-next-line
	const debounceInputChange = useCallback(
		debounce((value) => {
			setSearchName(value);
		}, 500),
		[]
	);

	const handleChange = useCallback(
		(e) => {
			const value = e.target.value;
			setSearchValue(value);
			debounceInputChange(value);
		},
		[debounceInputChange]
	);

	const clearSearchValue = useCallback(() => {
		setSearchValue('');
		setSearchName('');
	}, []);

	const judgeOwnerStatus = useCallback(() => {
		return isLoading || tldLoading
			? 'loading'
			: data && data.owner === zeroAddress
			? 'UnSupport'
			: available
			? 'Available'
			: 'Registered';
	}, [isLoading, available, tldLoading, data]);

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
					<PopoverListItem
						valid={validName.toString()}
						onClick={() => {
							if (judgeOwnerStatus() === 'Available') {
								const domainPartList = searchValue.split('.');
								navigate(
									`/register/${domainPartList[0]}-${domainPartList[1]}.eth`
								);
							}
						}}
					>
						{validName ? (
							<>
								<ListItemTitle>{searchValue}</ListItemTitle>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="center"
									spacing={1}
								>
									{judgeOwnerStatus() !== 'loading' ? (
										<RegisterStatus status={judgeOwnerStatus()}>
											{judgeOwnerStatus()}
										</RegisterStatus>
									) : (
										<CircularProgress size={14} thickness={7} />
									)}
									<ChevronRightIcon
										sx={(theme) => ({ color: theme.color.mentionColor })}
									/>
								</Stack>
							</>
						) : (
							<ListItemTitle>Invalid name(eg:your_name.domain)</ListItemTitle>
						)}
					</PopoverListItem>
				</PopoverList>
			</Collapse>
		</SearchWrapper>
	);
};

export default memo(SearchInput);
