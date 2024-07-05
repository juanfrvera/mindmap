import styles from "./command.module.scss";

export default function Command() {
  return (
    <input
      type="text"
      placeholder="Enter command"
      className={styles.commandBar}
    ></input>
  );
}
