import { Link } from "react-router-dom";

export const Success = () => {
    return(
        <div className="success">
            <h1>Success!</h1>
            <h4>Your image has been uploaded</h4>
            <button className="btn btn-info choices">
                <Link to={"/details"}>    
                    View your Post
                </Link> 
            </button>
            <button className="btn btn-info choices">
                <Link to={"/create"}>    
                    Create a new Post
                </Link> 
            </button>
            <button className="btn btn-info choices">
                <Link to={"/welcome"}>    
                    Home
                </Link> 
            </button>
             
        </div>
    )
}