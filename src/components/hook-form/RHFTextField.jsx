import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField, IconButton, InputAdornment } from '@mui/material';

import Iconify from '../iconify';

RHFTextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
};

function RHFTextField({ name, type, helperText, ...other }) {
  const { control } = useFormContext();

  if (type === 'password') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton tabIndex={-1} onClick={() => setShowPassword(!showPassword)}>
                    <Iconify
                      icon={
                        showPassword
                          ? 'material-symbols:visibility-outline'
                          : 'material-symbols:visibility-off'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...other}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

export default memo(RHFTextField);
