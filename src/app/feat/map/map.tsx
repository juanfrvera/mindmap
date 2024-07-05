import Command from "../command/command";
import styles from "./map.module.scss";

export default function Map() {
  return (
    <div>
      Map
      <div className={styles.commandBarContainer}>
        <Command></Command>
      </div>
    </div>
  );
}
