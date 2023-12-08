/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
import { enqueueSnackbar } from 'notistack';

export const showUserMessage = (response) => {
  if (response) {
    const { message, variant } = response;
    enqueueSnackbar(message, { variant });
  } else {
    enqueueSnackbar('something went wrong please refresh the page and try again', {
      variant: 'error',
    });
  }
};
