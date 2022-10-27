import { HandlerTools } from '@iote/cqrs';

import { BotDataService } from './data-service-abstract.class';

import { Connection } from '@app/model/convs-mgr/conversations/chats';
import { BaseChannel } from '@app/model/bot/channel';

/**
 * Contains all the required database flow methods for writing and reading blocks information
 */
export class ConnectionsDataService extends BotDataService<Connection> {
  private _docPath: string;
  private _channel: BaseChannel;

  constructor(channel: BaseChannel, tools: HandlerTools) 
  {
    super(tools)
    this._init(channel)
  }

  protected _init(channel: BaseChannel){
    this._docPath = `orgs/${channel.orgId}/stories/${channel.storyId}/connections`
    this._channel = channel
  }


  async getConnByOption(optionId: string): Promise<Connection> {

    const conn = await this.getDocumentByField('sourceId', optionId, this._docPath)

    if (!conn[0]) {
      throw new Error('Connection does not exist');
    }

    return conn[0];
  }

  /** Gets the connection whose source matches the block id provided */
  async getConnBySourceId(blockId: string): Promise<Connection> {

    const conn = await this.getDocumentByField('sourceId', `defo-${blockId}`, this._docPath)

    if (!conn[0]) {
      throw new Error('Connection does not exist');
    }

    return conn[0];
  }

  /** Gets the connection that links the anchor block and the first block */
  async getFirstConn(): Promise<Connection> {

    const conn = await this.getDocumentByField('sourceId', `${this._channel.storyId}`, this._docPath)

    if (!conn[0]) {
      throw new Error('First Connection does not exist');
    }

    return conn[0];
  }
}