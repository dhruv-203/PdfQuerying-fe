import { api } from "./Api";
import { APIError, APIResponse, Conversation } from "./types";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllConversations: builder.query<
      APIResponse<{ conversations: string[] } | APIError>,
      void
    >({
      query: () => {
        console.log("Requesting Get All Conversations");
        return {
          url: "/chat/getConversations",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    createConversation: builder.mutation<
      APIResponse<{ conversationId: string } | APIError>,
      FormData
    >({
      query: (body: FormData) => {
        console.log("Requesting Create Conversation");
        return {
          url: "/chat/createConversation",
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    getConversationById: builder.query<
      APIResponse<{
        conversation: Conversation;
        isActiveCollectionExists: boolean;
      }>,
      string
    >({
      query: (conversationId: string) => {
        console.log("Requesting Get Conversation By Id");
        return {
          url: `/chat/getConversationById/${conversationId}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    sendMessage: builder.mutation<
      APIResponse<Conversation | APIError>,
      { conversationId: string; message: string }
    >({
      query: ({ conversationId, message }) => {
        console.log("Requesting Send Message");
        return {
          url: `/chat/sendMessage`,
          method: "POST",
          body: { conversationId, message },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetAllConversationsQuery,
  useCreateConversationMutation,
  useLazyGetConversationByIdQuery,
  useSendMessageMutation,
} = chatApi;
