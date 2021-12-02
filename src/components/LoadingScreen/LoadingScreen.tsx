import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../Loader";

export default function LoadingScreen() {
  const isLoading = useSelector((state: RootState) => state.loadingData.isLoading);

  return isLoading ? (
    <div
      className="d-flex ai-center jc-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        opacity: 0.2,
      }}
    >
      <Loader />
    </div>
  ) : null;
}
