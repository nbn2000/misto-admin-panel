/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef } from 'react';
import { PatternFormat } from 'react-number-format';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

const ForwardedPatternFormat = forwardRef((props, ref) => {
  return <PatternFormat {...props} inputRef={ref} />;
});

const InputPhone = (props) => {
  return <TextField {...props} label="Phone number" type="tel" fullWidth />;
};

export const RHFPhone = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="tel"
      render={({ field }) => (
        <ForwardedPatternFormat
          {...field}
          format="+998 ## ### ####"
          allowEmptyFormatting
          mask="_"
          customInput={InputPhone}
        />
      )}
    />
  );
};
