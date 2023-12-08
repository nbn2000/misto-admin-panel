/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Stack, Button, Container } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import { RHFTextField } from 'src/components/hook-form';

export default function DynamicForm() {
  const { control } = useFormContext();

  const {
    fields: properties,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control,
    name: 'properties',
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#edeff1',
        borderRadius: '10px',
        padding: '5%',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
      }}
    >
      {[...properties].map((property, propertyIndex) => (
        <Stack
          spacing={5}
          direction="column"
          key={property.id}
          sx={{
            bgcolor: 'white',
            borderRadius: '10px',
            padding: '5%',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
            margin: '10px',
          }}
        >
          <RHFTextField name={`properties.${propertyIndex}.property`} label="property" fullWidth />
          <DynamicSubForm propertyIndex={propertyIndex} />
          {propertyIndex > 0 && (
            <Button
              variant="contained"
              size="large"
              color="error"
              id="remove-property"
              onClick={() => removeProperty(propertyIndex)}
            >
              <Iconify icon="bi:trash-fill" />
            </Button>
          )}
        </Stack>
      ))}
      <Button
        variant="contained"
        id="add-property"
        onClick={() => {
          appendProperty({
            property: '',
            values: [{ value: '' }],
          });
        }}
        fullWidth
        size="large"
        color="secondary"
        sx={{ margin: '10px' }}
      >
        <Iconify icon="zondicons:add-solid" />
      </Button>
    </Container>
  );
}

const DynamicSubForm = ({ propertyIndex }) => {
  const { control } = useFormContext();

  const {
    fields: values,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `properties.${propertyIndex}.values`, // Use the correct path for values based on the property index
  });
  return (
    <>
      {[...values].map((value, valueIndex) => (
        <Stack key={value.id} spacing={5} direction="row" justifyContent="center">
          <RHFTextField
            name={`properties.${propertyIndex}.values.${valueIndex}.value`}
            label="value"
          />
          <Button variant="contained" id="remove-value" onClick={() => removeValue(valueIndex)}>
            <Iconify icon="zondicons:minus-solid" />
          </Button>
        </Stack>
      ))}
      <Button
        variant="contained"
        size="large"
        id="add-value"
        onClick={() => {
          appendValue({
            value: '',
          });
        }}
      >
        <Iconify icon="zondicons:add-solid" />
      </Button>
    </>
  );
};
