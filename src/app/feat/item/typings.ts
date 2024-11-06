import { IPosition } from "../position/position";

export interface INode {
  id: string;
  position: IPosition;
  isEditing?: boolean;
}

export interface ILink {
  id: string;
  fromNodeId?: string;
  toNodeId?: string;
  fromPosition?: IPosition;
  toPosition?: IPosition;
}
