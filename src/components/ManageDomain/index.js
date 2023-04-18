import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Input,
	Stack,
	Switch,
	Table,
	styled,
	TableHead,
	TableRow,
	TableCell,
	Typography,
	TableContainer,
	Box,
	TableBody,
} from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { LoadingButton } from '@mui/lab';
import {
	digitDefault,
	digitsDifferentLengthToDefaultPrice,
	digitsLength,
	tokenSetDefault,
} from '../../config/profilePageSetting';

const Cell = styled(TableCell)(({ theme }) => ({
	width: '50px',
	padding: theme.spacing(1),
	textAlign: 'center',
	input: {
		width: '100%',
		border: 'none',
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: theme.typography.fontSize,
		...theme.typography.caption,
		':active,:hover,:focus-visible': {
			border: 'none',
		},
		'&:focus-visible': {
			border: 'none',
			outline: 'none',
		},
	},
}));

const Label = styled(Typography)(() => ({}));

const ManageDomain = () => {
	const { address } = useAccount();

	const [checkList, setCheckList] = useState(tokenSetDefault);
	const [tokenPriceList, setTokenPriceList] = useState(new Map());

	const [digitChecked, setDightChecked] = useState(true);

	const calCheckedCount = useMemo(() => {
		const arr = Object.values(checkList);
		const checkedList = arr.filter((item) => item === true);
		return checkedList.length;
	}, [checkList]);

	const tableWidth = useMemo(() => {
		return calCheckedCount * 20;
	}, [calCheckedCount]);

	const handleChangeToken = useCallback(
		(event) => {
			const name = event.target.name;
			const checked = event.target.checked;
			const newChecked = { ...checkList, [name]: checked };
			// get true length in checklist
			const trueLength = Object.values(newChecked).filter(
				(item) => item === true
			).length;
			// required choose one
			if (trueLength >= 1) {
				setCheckList({ ...newChecked });
			} else {
				setCheckList({ ...checkList });
			}
		},
		[checkList]
	);

	const handleChangeDigit = (event) => {
		setDightChecked(event.target.checked);
		setCheckList({ ...tokenSetDefault });
		setTokenPriceList(new Map());
	};

	// 说明
	// 两种模式的价格默认值和域名长度都放在config里面，作为一个配置项
	// 币种+价格的列表存为map，格式: usdt: [10, 10 ,10], 数组里面的对应的是域名长度 3， 4， 4+，这个配置对应config里面的 digitsLength
	// 进入页面的时候就获取默认的选择币种对tokenPriceList变量进行操作，更具by-digit的选择状态存入默认价格
	// 如果checkList改变也会触发tokenPriceList变量的改变，设置新的token和它的默认价格
	// 改变对应的token的价格修改tokenPriceList已有的key对应长度的价格，(因为我把域名长度作为了常量，所以它的下标index都是固定的，不需要在数组里面循环查找)

	const [saveTimeId, setSaveTimeId] = useState(null);

	const changePrice = useCallback(
		(v, token, pricePlace) => {
			saveTimeId && clearTimeout(saveTimeId);
			const id = setTimeout(() => {
				const oldTokenPrice = tokenPriceList.has(token)
					? [...tokenPriceList.get(token)]
					: [...digitsDifferentLengthToDefaultPrice];
				const newPrice = v.target.value;
				oldTokenPrice.splice(pricePlace, 1, newPrice);
				setTokenPriceList((v) => v.set(token, oldTokenPrice));
			}, 300);
			setSaveTimeId(id);
			return () => saveTimeId && clearTimeout(saveTimeId);
		},
		[tokenPriceList, saveTimeId]
	);

	const tokenPriceValue = useCallback(
		(token) => {
			if (!tokenPriceList.has(token)) {
				return [...digitsDifferentLengthToDefaultPrice];
			}
			return [...tokenPriceList.get(token)];
		},
		[tokenPriceList]
	);

	useEffect(() => {
		const keys = Object.keys(checkList);
		keys.forEach((item) => {
			if (checkList[item]) {
				const priceData = digitChecked ? tokenPriceValue(item) : [digitDefault];
				setTokenPriceList((v) => v.set(item, priceData));
			}
		});
	}, [checkList, digitChecked, tokenPriceValue]);

	return (
		<>
			{/* Choose tokens */}
			<Stack direction="row" alignItems="center" spacing={2}>
				<Label>Paid token:</Label>
				<FormGroup
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					{Object.keys(checkList).map((value, index) => (
						<FormControlLabel
							key={index}
							control={
								<Checkbox
									name={value}
									// value={checkList[value]}
									checked={checkList[value]}
									// required={value === 'USDT'}
									// disabled={value !== 'USDT'}
									onChange={handleChangeToken}
								/>
							}
							label={value}
						/>
					))}
				</FormGroup>
			</Stack>
			{/* Receiving adress */}
			<Stack direction="row" alignItems="center" spacing={1}>
				<Label>Receiving address:</Label>
				<Input value={address} disableUnderline={true} />
			</Stack>
			{/* Pricing */}
			<Stack direction="row" alignItems="center" spacing={1}>
				<Label>Pricing: by-digit</Label>
				<Switch checked={digitChecked} onChange={handleChangeDigit} />
			</Stack>
			<TableContainer
				sx={(theme) => ({
					width: digitChecked ? '80%' : `${tableWidth}%`,
					minWidth: '30%',
					maxWidth: '100%',
					border: '1px solid #0000001A',
					borderRadius: theme.spacing(1),
				})}
			>
				{digitChecked ? (
					<Table>
						<TableHead>
							<TableRow sx={{ borderRadius: '20px' }}>
								<Cell>Token/digit</Cell>
								{digitsLength.map((item) => (
									<Cell key={item}>{item}</Cell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(checkList).map((value) =>
								checkList[value] ? (
									<TableRow key={value}>
										<Cell component="th" scope="row">
											{value}
										</Cell>
										{digitsDifferentLengthToDefaultPrice.map((price, index) => (
											<Cell component="th" scope="row" key={index}>
												<input
													defaultValue={price}
													onInput={(v) => changePrice(v, value, index)}
												/>
											</Cell>
										))}
									</TableRow>
								) : (
									''
								)
							)}
						</TableBody>
					</Table>
				) : (
					<Table>
						<TableHead>
							<TableRow sx={{ borderRadius: '20px' }}>
								<Cell>Token</Cell>
								{Object.keys(checkList).map((value) =>
									checkList[value] ? <Cell key={value}>{value}</Cell> : ''
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<Cell component="th" scope="row">
									Price
								</Cell>
								{Object.keys(checkList).map((value) =>
									checkList[value] ? (
										<Cell component="th" scope="row" key={value}>
											<input
												defaultValue={digitDefault}
												onInput={(v) => changePrice(v, value, 0)}
											/>
										</Cell>
									) : (
										''
									)
								)}
							</TableRow>
						</TableBody>
					</Table>
				)}
			</TableContainer>
			<Box>
				<LoadingButton sx={{ width: '85px' }} variant="contained">
					Confirm
				</LoadingButton>
			</Box>
		</>
	);
};

export default memo(ManageDomain);
