import { iItem } from "./typings";
import styles from "./item.module.scss";

export default function Item({ item }: { item: iItem }) {
  return (
    <rect
      className={styles.itemRect}
      x={item.position.x}
      y={item.position.y}
    ></rect>
  );
}
