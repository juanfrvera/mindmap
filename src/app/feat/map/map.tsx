import { useState } from "react";
import Command from "../command/command";
import styles from "./map.module.scss";
import Item from "../item/item";
import { iItem } from "../item/typings";
import { IPosition } from "../position/position";

export default function Map() {
  const clickOnContainer = (ev: React.MouseEvent<HTMLDivElement>) => {
    addItem({ x: ev.clientX, y: ev.clientY });
  };

  const addItem = (position: IPosition) => {
    const newItem = { id: crypto.randomUUID(), position };
    setItems([...items, newItem]);
  };

  const [items, setItems] = useState<iItem[]>([]);

  const itemsUi = items.map((item) => <Item key={item.id} item={item}></Item>);

  return (
    <div onClick={clickOnContainer} className={styles.mapContainer}>
      <svg className={styles.svgCanvas}>{itemsUi}</svg>
      <div className={styles.commandBarContainer}>
        <Command></Command>
      </div>
    </div>
  );
}
