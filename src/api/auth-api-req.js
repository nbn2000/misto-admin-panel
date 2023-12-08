/* eslint-disable spaced-comment */
import { ErrorHandle } from 'src/utils/handleErorrs';
import { showUserMessage } from 'src/utils/showUserMessage';

import api from './index';
import { AUTH } from './urls';

// auth api
export const authApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${AUTH.LOGIN}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ['LOGIN']),
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        localStorage.setItem('user', JSON.stringify(res?.data?.innerData?.usernameAndId));
        return res;
      },
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `${AUTH.SIGNUP}`,
        method: 'POST',
        body,
      }),
      onSuccess: (data) => data,
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        showUserMessage(res);
        return res;
      },
      invalidatesTags: ['SIGNUP'],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiReq;
