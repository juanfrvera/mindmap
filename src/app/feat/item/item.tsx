import { iItem } from "./typings";
import styles from "./item.module.scss";
import { useEffect, useState } from "react";

export default function Item({ item, setEditing }: { item: iItem; setEditing: (editing: boolean) => void }) {
  const clickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setEditing(true);
  };

  const doubleClickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  // I want to use an effect to trigger at the first render
  // and focus on the text container
  useEffect(() => {
    // I want to focus on the text container
    document.getElementById(`textContainer_${item.id}`)?.focus();
  }, [item.id]);

  return (
    <div
      onClick={clickOnContainer}
      onDoubleClick={doubleClickOnContainer}
      className={styles.container}
      style={{ left: item.position.x, top: item.position.y }}
    >
      <div
        id={`textContainer_${item.id}`}
        className={styles.textContainer}
        contentEditable={item.isEditing}
        autoFocus
      ></div>
      {item.isEditing && (
        <button>Arrow</button>
      )}
    </div>
  );
}
