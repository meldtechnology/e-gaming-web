import { FormLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const DocumentForm =({form}) => {
  return (
    form?.map((group, index) => (
      <div key={index}>
        <Typography
          variant="h6"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#333396'
          }}
        >
          {group?.headerTitle}
        </Typography>
        <hr className="bg-amber-400 h-1 mb-3" />
        <Box>
          {group?.formControls?.map((field, i) => (
            <div key={'field-'+i} className='m-0'>
              <FormLabel sx={{ fontWeight: 700}}>
                {field?.label}
              </FormLabel>
              <TextField label={field?.label}
                         fullWidth
                         variant='outlined'
                         value={field?.value}
                         aria-readonly={true} />
            </div>
          ))}
        </Box>
      </div>
    ))
    // <FormLabel>Ok</FormLabel>
  );
}