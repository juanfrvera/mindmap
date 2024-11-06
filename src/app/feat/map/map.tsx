import { useCallback, useEffect, useState } from "react";
import Command from "../command/command";
import styles from "./map.module.scss";
import Item from "../item/item";
import { INode, ILink } from "../item/typings";
import { IPosition } from "../position/position";

export default function Map() {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [editedNode, setEditedNode] = useState<INode>();
  const [movingLinkId, setMovingLinkId] = useState<string>();
  const [links, setLinks] = useState<ILink[]>([]);

  const mouseMovedWithLink = useCallback(
    (ev: MouseEvent) => {
      if (!movingLinkId) {
        return;
      }
      setLinks((links) => {
        return links.map((link) => {
          if (link.id === movingLinkId) {
            link.toPosition = { x: ev.clientX, y: ev.clientY };
          }
          return link;
        });
      });
    },
    [movingLinkId]
  );

  useEffect(() => {
    const mouseUpWithLink = () => {
      setMovingLinkId(undefined);
    };
    document.addEventListener("mouseup", mouseUpWithLink);
    return () => {
      document.removeEventListener("mouseup", mouseUpWithLink);
    };
  }, [movingLinkId]);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMovedWithLink);
    return () => {
      document.removeEventListener("mousemove", mouseMovedWithLink);
    };
  }, [mouseMovedWithLink]);

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

  const mouseDownOnArrow = (
    ev: React.MouseEvent<HTMLButtonElement>,
    node: INode
  ) => {
    const position: IPosition = { x: ev.clientX, y: ev.clientY };
    const link: ILink = {
      id: crypto.randomUUID(),
      fromNodeId: node.id,
      fromPosition: position,
      toPosition: position,
    };
    setMovingLinkId(link.id);
    setLinks([...links, link]);
  };

  const itemsUi = nodes.map((node) => (
    <Item
      key={node.id}
      node={node}
      setEditing={(value: boolean) => setEditing(node.id, value)}
      onMouseDownOnArrow={mouseDownOnArrow}
    ></Item>
  ));

  const linksUi = links.map((link) => (
    <path
      key={link.id}
      d={`M ${link.fromPosition.x} ${link.fromPosition.y} L ${link.toPosition.x} ${link.toPosition.y}`}
      stroke="black"
      fill="transparent"
    ></path>
  ));

  return (
    <div className={styles.mapContainer}>
      <div onDoubleClick={doubleClickOnCanvas} className={styles.canvas}>
        <svg className={styles.svgLinks}>{linksUi}</svg>
        {itemsUi}
      </div>
      <div className={styles.commandBarContainer}>
        <Command></Command>
      </div>
    </div>
  );
}
