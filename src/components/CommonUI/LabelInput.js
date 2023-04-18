import { Box, Input, InputLabel } from "@mui/material";

const LabelInput = ({ label, labelSx, ...props }) => {
  return (
    <Box>
      <InputLabel sx={labelSx}>{label}</InputLabel>
      <Input
        {...props}
        disableUnderline={true}
        sx={(theme) => ({ marginTop: theme.spacing(1) })}
      />
    </Box>
  );
};

export default LabelInput;
