/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button, Container, Typography } from '@mui/material';

import { useUploadFileMutation, useUploadFilesMutation } from 'src/api/file-api-req';

import Iconify from 'src/components/iconify';

import { PreviewImage } from './PreviewImage';

export const RHFuploadImage = ({ multiple, showFiles, name }) => {
  const [uploadFile] = useUploadFileMutation();
  const [uploadFiles] = useUploadFilesMutation();
  const {
    control,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const formData = new FormData();

    const { files } = event.target;

    const invalidFiles = Array.from(files).some(
      (file) =>
        !file?.type?.startsWith('image/') || !['image/png', 'image/jpeg'].includes(file.type)
    );

    if (invalidFiles) {
      setError(name, {
        type: 'manual',
        message: 'Invalid file type. Please select only image files (PNG, JPEG).',
      });
      return null;
    }

    if (event?.target?.multiple) {
      setSelectedFiles([...files]);
      [...files].map((i) => formData.append('files', i));
      await uploadFiles(formData)
        .unwrap()
        .then((data) => {
          setValue('files', data?.innerData);
        });
    } else {
      setSelectedFiles([files[0]]);
      formData.append('file', files[0]);
      await uploadFile(formData)
        .unwrap()
        .then((data) => {
          setValue('file', data?.innerData);
        });
    }
  };

  const handleDeleteImage = (e) => {
    if (name === 'files') {
      const newSelectedFiles = [...selectedFiles];
      const newfiles = watch('files');
      newfiles.splice(e, 1);
      newSelectedFiles.splice(e, 1);
      setSelectedFiles(newSelectedFiles);
      setValue('files', newfiles);
    } else if (name === 'file') {
      setValue('file', '');
      setSelectedFiles([]);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Container
          sx={{
            boxShadow:
              'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          {errors.files && <Typography color="red">{errors.files.message}</Typography>}
          <Button type="button" variant="contained" component="label" sx={{ width: '100%' }}>
            <input
              id="files"
              name="files"
              type="file"
              multiple={multiple.multiple ?? false}
              accept="image/x-png, image/jpeg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            Upload Image
            <Iconify icon="ph:upload-fill" />
          </Button>
          <PreviewImage
            watch={watch}
            showFiles={showFiles}
            selectedFiles={selectedFiles}
            name={name}
            handleDeleteImage={handleDeleteImage}
          />
        </Container>
      )}
    />
  );
};

RHFuploadImage.propTypes = {
  multiple: propTypes.object.isRequired,
  showFiles: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
};
