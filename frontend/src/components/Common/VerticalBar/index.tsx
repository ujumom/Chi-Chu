import { Box, Slider } from '@mui/material';

function VerticalBar({ value }: { value: number }) {
  const marks = [{ value: value, label: '' }];

  return (
    <Box sx={{ height: 200 }}>
      <Slider
        orientation="vertical"
        valueLabelDisplay="on"
        defaultValue={value}
        step={null}
        marks={marks}
      />
    </Box>
  );
}

export default VerticalBar;
