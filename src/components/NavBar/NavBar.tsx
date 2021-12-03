import { Link } from "react-router-dom";
import CrehanaLogo from "../CrehanaLogo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <div className={`w-100 d-flex ai-center shadow ${styles.navBar}`}>
      <nav className="container">
        <ul>
          <li>
            <Link className="d-flex ai-center" to="/">
              <div>
                <CrehanaLogo />
              </div>
              <span style={{ margin: "0 10px" }}>-</span>
              <h2 style={{ fontSize: 20, fontWeight: 400 }}>Countries Challenge</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
