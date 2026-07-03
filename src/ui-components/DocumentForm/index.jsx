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
            color: 'text.primary'
          }}
        >
          {group?.headerTitle}
        </Typography>
        <hr className="mb-4 h-0.5 border-0 bg-brand" />
        <Box>
          {group?.formControls?.map((field, i) => (
            <div key={'field-'+i} className='mb-4'>
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