import { INode } from "./typings";
import styles from "./item.module.scss";
import { useEffect, useState } from "react";

export default function Item({
  node,
  setEditing,
  onMouseDownOnArrow,
}: {
  node: INode;
  setEditing: (editing: boolean) => void;
  onMouseDownOnArrow: (
    ev: React.MouseEvent<HTMLButtonElement>,
    node: INode
  ) => void;
}) {
  // I want to use an effect to trigger at the first render
  // and focus on the text container
  useEffect(() => {
    // I want to focus on the text container
    document.getElementById(`textContainer_${node.id}`)?.focus();
  }, [node.id]);

  const clickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setEditing(true);
  };

  const doubleClickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  const mouseDownOnArrow = (ev: React.MouseEvent<HTMLButtonElement>) => {
    onMouseDownOnArrow(ev, node);
  };

  return (
    <div
      onClick={clickOnContainer}
      onDoubleClick={doubleClickOnContainer}
      className={styles.container}
      style={{ left: node.position.x, top: node.position.y }}
    >
      <div
        id={`textContainer_${node.id}`}
        className={styles.textContainer}
        contentEditable={node.isEditing}
        autoFocus
      ></div>
      {node.isEditing && <button onMouseDown={mouseDownOnArrow}>Arrow</button>}
    </div>
  );
}
