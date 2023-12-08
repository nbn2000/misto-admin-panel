/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const RHFSelect = ({ label, name, options }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const selectError = errors[name];
  return (
    <Controller
      render={({ field }) => (
        <FormControl fullWidth error={!!selectError}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select labelId={`${name}-label`} id={name} label={label} {...field}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      control={control}
      name={name}
    />
  );
};
