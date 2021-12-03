import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "./Loader/Loader";

export default function LoadingScreen() {
  const isLoading = useSelector((state: RootState) => state.loadingData.isLoading);

  return isLoading ? (
    <div
      className="d-flex ai-center jc-center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#e1e2e1",
      }}
    >
      <Loader />
    </div>
  ) : null;
}
