/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Grid, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const GRID_ITEM_SIZE = 1.5;

const StyledButton = styled.button`
  position: absolute;
  top: -10px;
  right: -7px;
  border: none;
  background: none;
  cursor: pointer;
`;

export function PreviewImage({ watch, showFiles, selectedFiles, name, handleDeleteImage }) {
  if (showFiles.showFiles) {
    if (watch(name).length !== 0 && selectedFiles.length === 0) {
      return (
        <div>
          <Typography variant="subtitle1" marginTop={2}>
            Uploaded Images:
          </Typography>
          <Grid container spacing={1}>
            {Array.isArray(watch(name)) ? (
              watch(name)?.map((file, index) => (
                <Grid item xs={GRID_ITEM_SIZE} key={index}>
                  <img src={file} alt="images" width={70} />
                </Grid>
              ))
            ) : (
              <Grid item xs={GRID_ITEM_SIZE}>
                <img src={watch(name)} alt="image" width={70} />
              </Grid>
            )}
          </Grid>
        </div>
      );
    }
  }

  if (showFiles.showFiles && selectedFiles.length > 0) {
    return (
      <div>
        <Typography variant="subtitle1" marginTop={2} marginBottom={2}>
          Selected Images:
        </Typography>
        <Grid container spacing={1}>
          {selectedFiles.map((file, index) => (
            <Grid item xs={GRID_ITEM_SIZE} style={{ position: 'relative' }} key={index}>
              {file.type.startsWith('image/') ? (
                <>
                  <StyledButton onClick={() => handleDeleteImage(index)} type="button">
                    <Iconify icon="material-symbols-light:cancel" />
                  </StyledButton>
                  <img src={URL.createObjectURL(file)} alt={file.name} width={70} />
                </>
              ) : (
                <span>{file.name}</span>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return <div />;
}

PreviewImage.propTypes = {
  watch: PropTypes.any.isRequired,
  showFiles: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  selectedFiles: PropTypes.any.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
};
