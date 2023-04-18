import { Box, InputLabel, TextField, Typography, styled } from '@mui/material';
import { memo } from 'react';

const DigitalsCount = styled(Typography)(() => ({
	position: 'absolute',
	fontSize: '14px',
	fontWeight: 500,
	color: '#999999',
	right: '10px',
	bottom: '10px',
}));

const MultipleInput = ({
	label,
	labelSx,
	width = 350,
	inputSx = {},
	...props
}) => {
	return (
		<Box>
			<InputLabel sx={labelSx}>{label}</InputLabel>
			<Box sx={{ position: 'relative', width: `${width}px` }}>
				<TextField
					{...props}
					multiline
					rows={4}
					sx={(theme) => ({
						marginTop: theme.spacing(1),
						width: `${width}px`,
						...inputSx,
					})}
				/>
				{props?.value?.length > 0 ? (
					<DigitalsCount>{`${props.value.length} / ${props.maxcounts}`}</DigitalsCount>
				) : (
					''
				)}
			</Box>
		</Box>
	);
};

export default memo(MultipleInput);
