import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import { useState } from "react";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const Ranking = () => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }} >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        size="large"
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  )
}