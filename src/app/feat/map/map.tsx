import { useState } from "react";
import Command from "../command/command";
import styles from "./map.module.scss";
import Item from "../item/item";
import { iItem } from "../item/typings";
import { IPosition } from "../position/position";

export default function Map() {
  const doubleClickOnCanvas = (ev: React.MouseEvent<HTMLElement>) => {
    addItem({ x: ev.clientX, y: ev.clientY });
  };

  const addItem = (position: IPosition) => {
    const newItem = { id: crypto.randomUUID(), position };
    setItems([...items, newItem]);
  };

  const setEditing = (id: string, editing: boolean) => {
    const newItems = items.map((item) => ({ ...item, isEditing: item.id === id }));
    setItems(newItems);
  }

  const [items, setItems] = useState<iItem[]>([]);

  const itemsUi = items.map((item) => <Item key={item.id} item={item} setEditing={(value: boolean) => setEditing(item.id, value)}></Item>);

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
