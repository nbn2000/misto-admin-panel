/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';

import { useAddCardMutation } from 'src/api/add-card-api-req';

import { RHFSelect, RHFTextField, RHFuploadImage } from 'src/components/hook-form';

import DynamicForm from './dynamicForm';

function InputPrice() {
  return <RHFTextField name="price" label="Price" type="number" />;
}
export default function Form() {
  const [addCard, result] = useAddCardMutation();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      file: '',
      files: [],
      properties: [
        {
          property: '',
          values: [{ value: '' }],
        },
      ],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    await addCard(data)
      .unwrap()
      .then((res) => console.log(res));
    reset();
    navigate('/products');
  };
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '10px',
          padding: '5%',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="description" label="Description" minRows={3} multiline />
            <RHFSelect
              name="category"
              label="Category"
              options={[
                { label: 'Men', value: 'Men' },
                { label: 'Women', value: 'Women' },
                { label: 'Beauty', value: 'Beauty' },
                { label: 'Accessories', value: 'Accessories' },
              ]}
            />
            <NumericFormat thousandSeparator customInput={InputPrice} />
            <DynamicForm />
            <Typography variant="h4" fontSize={12} align="center">
              Main Images
            </Typography>
            <RHFuploadImage
              name="file"
              multiple={{ multiple: false }}
              showFiles={{ showFiles: true }}
            />
            <Typography variant="h4" fontSize={12} align="center">
              Secondary Images
            </Typography>
            <RHFuploadImage
              name="files"
              multiple={{ multiple: true }}
              showFiles={{ showFiles: true }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullwidth="true"
              loading={result.isLoading}
              size="large"
              color="success"
              disabled={isSubmitting}
              loadingPosition="center"
            >
              SAVE
            </LoadingButton>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
}
