import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	styled,
	TableCell,
	Pagination,
} from '@mui/material';
import { memo } from 'react';

const HeadCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(1, 1, 0, 1),
	borderBottom: 'none',
	fontWeight: 800,
	color: theme.color.mentionColor,
	fontSize: '14px',
}));

const Cell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(1),
	borderBottom: 'none',
	color: theme.color.text,
	fontWeight: 500,
	fontSize: '16px',
}));

const list = [
	{
		subname: 'abc.bayc.eth',
		price: '200 USDC',
		txHash: '0x3568..ddf126',
		txTime: '2023/03/2617:50:42',
	},
	{
		subname: 'abc.bayc.eth',
		price: '200 USDC',
		txHash: '0x3568..ddf126',
		txTime: '2023/03/2617:50:42',
	},
	{
		subname: 'abc.bayc.eth',
		price: '200 USDC',
		txHash: '0x3568..ddf126',
		txTime: '2023/03/2617:50:42',
	},
	{
		subname: 'abc.bayc.eth',
		price: '200 USDC',
		txHash: '0x3568..ddf126',
		txTime: '2023/03/2617:50:42',
	},
];

const TransactionTable = () => {
	return (
		<>
			<Table>
				<TableHead>
					<TableRow sx={{ borderRadius: '20px' }}>
						<HeadCell>sold subname</HeadCell>
						<HeadCell>price</HeadCell>
						<HeadCell>tx hash</HeadCell>
						<HeadCell>tx time</HeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{list.map((item, index) => (
						<TableRow key={index}>
							<Cell component="th" scope="row">
								{item.subname}
							</Cell>
							<Cell component="th" scope="row">
								{item.price}
							</Cell>
							<Cell component="th" scope="row">
								{item.txHash}
							</Cell>
							<Cell component="th" scope="row">
								{item.txTime}
							</Cell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Pagination
				count={10}
				shape="rounded"
				size="small"
				sx={{
					marginTop: '20px',
					'.MuiPagination-ul': {
						justifyContent: 'flex-end',
					},
				}}
			/>
		</>
	);
};

export default memo(TransactionTable);
