import React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({
  label = "Buscar",
  options = [],
  placeholder = "",
  startAdornment = <SearchIcon style={{ marginRight: '8px' }} />,
  sx = { px: 4 },
  freeSolo = true,
  ...props
}) {
  return (
    <Box>
      <Autocomplete
        fullWidth
        freeSolo={freeSolo}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={label}
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: startAdornment,
            }}
            placeholder={placeholder}
          />
        )}
        sx={sx}
        {...props}
      />
    </Box>
  );
}