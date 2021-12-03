import BackToHomeButton from "../components/BackToHomeButton/BackToHomeButton";

const ErrorView = () => {
  return (
    <div className="container">
      <BackToHomeButton />
      <div className="d-flex flex-column ai-center jc-center">
        <img
          className="card"
          src="./imgs/404.gif"
          alt="error 404"
          width="300px"
          height="300px"
          style={{ borderRadius: "50%" }}
        />
        <h1 style={{ fontSize: 60, margin: "20px 0 10px" }}>404</h1>
        <h2 style={{ fontSize: 40, margin: "10px 0" }}>NOT FOUND</h2>
        <p>Page not found. I'm sorry</p>
      </div>
    </div>
  );
};

export default ErrorView;
