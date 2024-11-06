import { useState } from "react";
import Command from "../command/command";
import styles from "./map.module.scss";
import Item from "../item/item";
import { INode, ILink } from "../item/typings";
import { IPosition } from "../position/position";

export default function Map() {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [editedNode, setEditedNode] = useState<INode>();
  const [movingLink, setMovingLink] = useState<ILink>();

  const doubleClickOnCanvas = (ev: React.MouseEvent<HTMLElement>) => {
    addItem({ x: ev.clientX, y: ev.clientY });
  };

  const addItem = (position: IPosition) => {
    const newItem: INode = {
      id: crypto.randomUUID(),
      position,
      isEditing: true,
    };
    setNodes([...nodes, newItem]);
    if (editedNode) {
      editedNode.isEditing = false;
    }
    setEditedNode(newItem);
  };

  const setEditing = (id: string, editing: boolean) => {
    const newItems = nodes.map((item) => ({
      ...item,
      isEditing: item.id === id,
    }));
    setNodes(newItems);
  };

  const clickOnNodeArrow = (
    ev: React.MouseEvent<HTMLButtonElement>,
    node: INode
  ) => {
    const position: IPosition = { x: ev.clientX, y: ev.clientY };
    const link: ILink = {
      id: crypto.randomUUID(),
      fromNodeId: node.id,
      fromPosition: position,
    };
  };

  const itemsUi = nodes.map((node) => (
    <Item
      key={node.id}
      node={node}
      setEditing={(value: boolean) => setEditing(node.id, value)}
      onClickOnArrow={clickOnNodeArrow}
    ></Item>
  ));

  return (
    <div className={styles.mapContainer}>
      <div onDoubleClick={doubleClickOnCanvas} className={styles.canvas}>
        {itemsUi}
      </div>
      <div className={styles.commandBarContainer}>
        <Command></Command>
      </div>
    </div>
  );
}
