import {
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	styled,
} from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useState } from 'react';
import LineBarChart from './LineBarChart';
import TransactionTable from './TransactionTable';

const ToggleWrapper = styled(ToggleButtonGroup)(() => ({
	height: '37px',
	'& button:first-of-type': {
		borderRadius: '10px 0 0 10px',
	},
	'& button:last-of-type': {
		borderRadius: '0 10px 10px 0',
	},
}));

const dates = ['ALL', 'Day', 'Week', 'Month'];

const Portfolio = () => {
	const [times, setTimes] = useState('Day');

	const handleChangeDate = useCallback((_, newValue) => {
		setTimes(newValue);
	}, []);

	return (
		<>
			<StatisticsCard />

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={3}
			>
				<Typography
					sx={(theme) => ({
						fontSize: '16px',
						color: theme.color.text,
					})}
				>
					Domain Registration Overview
				</Typography>
				<ToggleWrapper
					sx={{
						borderRadius: '10px',
					}}
					value={times}
					exclusive
					onChange={handleChangeDate}
				>
					{dates.map((item) => (
						<ToggleButton value={item} key={item}>
							{item}
						</ToggleButton>
					))}
				</ToggleWrapper>
			</Stack>

			<LineBarChart />
			<TransactionTable />
		</>
	);
};

export default Portfolio;
