/* eslint-disable spaced-comment */
import { ErrorHandle } from 'src/utils/handleErorrs';
import { showUserMessage } from 'src/utils/showUserMessage';

import api from './index';
import { ADDNEWCARD } from './urls';

// auth api
export const cardApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    addCard: builder.mutation({
      query: (body) => ({
        url: `${ADDNEWCARD.ADDCARD}`,
        method: 'POST',
        body,
      }),
      onSuccess: (data) => data,
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        showUserMessage(res);
        return res;
      },
      invalidatesTags: ['ADDCARD'],
    }),
  }),
});

export const { useAddCardMutation } = cardApiReq;
