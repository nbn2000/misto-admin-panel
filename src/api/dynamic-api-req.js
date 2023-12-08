/* eslint-disable spaced-comment */
import { ErrorHandle } from 'src/utils/handleErorrs';
import { showUserMessage } from 'src/utils/showUserMessage';

import api from './index';
import { DYNAMICURL } from './urls';

// auth api
export const dynamicApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    userEdit: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${DYNAMICURL.USER}${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['EDITUSER'],
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        showUserMessage(res);
        return res;
      },
    }),
    userCard: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${DYNAMICURL.CARD}${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['EDITCARD'],
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        showUserMessage(res);
        return res;
      },
    }),
  }),
});

export const { useUserEditMutation, useUserCardMutation } = dynamicApiReq;
