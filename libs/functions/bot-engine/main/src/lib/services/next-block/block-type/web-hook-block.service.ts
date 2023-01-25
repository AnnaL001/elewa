import { HandlerTools } from "@iote/cqrs";
import { BlockDataService } from "../../data-services/blocks.service";
import { ConnectionsDataService } from "../../data-services/connections.service";
import { DefaultOptionMessageService } from "./default-block.service";

export class WebHookBlockService extends DefaultOptionMessageService{
  tools: HandlerTools;
  /** The http method. Should be a drop down */
  htttpMethod: HttpMethodTypes;

  /** The http url of the endpoint */
  httpUrl: string;

  /** An array of variables defined in the previous input blocks e.g. variable for a name input block can be `name`*/
  variablesToPost: string[];

  /** Optional token if required by the api we are posting to. Should be encoded with `__ENCODE_AES`*/
  authorizationToken?: string;

  constructor(blockDataService: BlockDataService, connDataService: ConnectionsDataService, tools: HandlerTools)
	{
		super(blockDataService, connDataService, tools);
		this.tools = tools;
	}
}
