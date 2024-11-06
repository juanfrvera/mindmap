import { IPosition } from "../position/position";

export interface INode {
  id: string;
  position: IPosition;
  isEditing?: boolean;
}

export interface ILink {
  id: string;
  fromPosition: IPosition;
  toPosition: IPosition;
  fromNodeId?: string;
  toNodeId?: string;
}
