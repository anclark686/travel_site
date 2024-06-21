import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <div className="success">
      <h1>Success!</h1>
      <h4>Your image has been uploaded</h4>
      <button className="btn btn-dark choices">
        <Link to={"/details"}>View Post</Link>
      </button>
      <br />
      <button className="btn btn-dark choices">
        <Link to={"/create"}>Create Post</Link>
      </button>
      <button className="btn btn-dark choices">
        <Link to={"/welcome"}>Home</Link>
      </button>
    </div>
  );
};
