import styles from "./Loader.module.scss";

export default function Loader({ show = true }: { show?: boolean }) {
  return show ? <div className={styles.loader}></div> : null;
}
