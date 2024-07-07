import { iItem } from "./typings";
import styles from "./item.module.scss";
import { useEffect, useState } from "react";

export default function Item({ item }: { item: iItem }) {
  const [editing, setEditing] = useState(true);

  const clickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.stopPropagation();
  };

  // I want to use an effect to trigger at the first render
  // and focus on the text container
  useEffect(() => {
    // I want to focus on the text container
    document.getElementById(`textContainer_${item.id}`)?.focus();
  }, [item.id]);

  return (
    <div
      onClick={clickOnContainer}
      className={styles.container}
      style={{ left: item.position.x, top: item.position.y }}
    >
      <div
        id={`textContainer_${item.id}`}
        className={styles.textContainer}
        contentEditable={editing}
        autoFocus
      ></div>
    </div>
  );
}
