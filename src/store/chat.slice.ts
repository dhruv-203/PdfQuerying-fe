import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatApi } from "./chat.api";

interface ChatState {
  selectedConversationId: string | null;
}

const initialState: ChatState = {
  selectedConversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversationId: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedConversationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.createConversation.matchFulfilled,
      (state, action) => {
        state.selectedConversationId = (
          action.payload.data as { conversationId: string }
        ).conversationId;
      }
    );
  },
});

export const chatReducer = chatSlice.reducer;
export const { setSelectedConversationId } = chatSlice.actions;
