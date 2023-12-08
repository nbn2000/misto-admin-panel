/* eslint-disable import/no-unresolved */
import { ErrorHandle } from 'src/utils/handleErorrs';

import api from './index';
import { FILE } from './urls';

// auth api
export const fileApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: `${FILE.FILE}`,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['UPLOADFILE'],
      transformErrorResponse: (err) => ErrorHandle(err),
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: `${FILE.FILES}`,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['UPLOADFILES'],
      transformErrorResponse: (err) => ErrorHandle(err),
    }),
  }),
});

export const { useUploadFileMutation, useUploadFilesMutation } = fileApiReq;
