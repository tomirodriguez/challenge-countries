import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <div className={`w-100 d-flex ai-center shadow ${styles.navBar}`}>
      <nav className="container">
        <ul>
          <li>
            <Link to="/">LINK TO HOME</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
