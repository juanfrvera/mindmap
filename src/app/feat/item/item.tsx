import { iItem } from "./typings";
import styles from "./item.module.scss";
import { useState } from "react";

export default function Item({ item }: { item: iItem }) {
  const [editing, setEditing] = useState(true);

  const clickOnContainer = (ev: React.MouseEvent<HTMLElement>) => {
    ev.stopPropagation();
  };

  return (
    <div
      onClick={clickOnContainer}
      className={styles.container}
      style={{ left: item.position.x, top: item.position.y }}
    >
      <div className={styles.textContainer} contentEditable={editing} autoFocus>
        Here goes your text
      </div>
    </div>
  );
}
