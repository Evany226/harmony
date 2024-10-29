"use server";

import * as convActions from "./conv";
import * as channelActions from "./channels";
import * as guildActions from "./guilds";
import * as friendActions from "./friends";

export const { createConversation, editMessage, updateLastViewed } =
  convActions;

export const {
  createChannel,
  updateChannel,
  deleteChannel,
  createChannelMessage,
  editChannelMessage,
} = channelActions;

export const {
  createNewGuild,
  deleteGuild,
  leaveGuild,
  createCategory,
  updateCategory,
  deleteCategory,
  createGuildRequest,
  uploadGuildImage,
} = guildActions;

export const { acceptFriendRequest } = friendActions;
