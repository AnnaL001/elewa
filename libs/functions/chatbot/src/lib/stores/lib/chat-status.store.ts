import { HandlerTools } from '@iote/cqrs';

import { Platforms } from '@app/model/convs-mgr/conversations/admin/system';
import { Chat, ChatStatus, Message } from '@app/model/convs-mgr/conversations/messages';
import { ChatInfo } from '@app/model/convs-mgr/conversations/chats';

/**
 * Contains all the required database flow methods for the chat-status collection
 */
export class ChatStatusStore {
  tools: HandlerTools;

  constructor(tools: HandlerTools) 
  {
    this.tools = tools;
  }

  async initChatStatus(chatInfo: ChatInfo, platform: Platforms) {
    const chatId = chatInfo.storyId;
    const chatRepo$ = this.tools.getRepository<Chat>(`end-users/${chatInfo.phoneNumber}/platforms/${platform}/chat-status`);

    const newStatus: Chat = {
      chatId,
      status: ChatStatus.Running,
      platform: platform,
    };
    const newChat = await chatRepo$.write(newStatus, chatId);

    return newChat;
  }

  async getChatStatus(chatInfo: ChatInfo, platform: Platforms) {
    const chatId = chatInfo.storyId;
    const chatRepo$ = this.tools.getRepository<Chat>(`end-users/${chatInfo.phoneNumber}/platforms/${platform}/chat-status`);

    const chatStatus = await chatRepo$.getDocumentById(chatId);

    return chatStatus;
  }

  async updateChatStatus(msg: Message, status: ChatStatus) {
    const chatId = msg.storyId;

    const chatRepo$ = this.tools.getRepository<Chat>(`end-users/${msg.phoneNumber}/platforms/${msg.platform}/chat-status`);

    const newStatus: Chat = {
      chatId,
      status,
      platform: msg.platform,
    };
    chatRepo$.write(newStatus, chatId);
  }
}