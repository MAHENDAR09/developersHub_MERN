import { Link, useParams } from "react-router-dom";

const Indprofile = (match) => {
  // Use useParams to access the URL parameters
  const { fullname, email, skill } = useParams();
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> Developers Hub
          </Link>
        </h1>
        <ul>
          <li><Link to="/myprofile">My Profile</Link></li>
          <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
        </ul>
      </nav>

      <section className="container">
        <Link to="/myprofile" className="btn btn-light">Back To Profiles</Link>
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary p-2">
            <img
              className="round-img my-1"
              src="https://www.gravatar.com/avatar/0000"
              alt="User Avatar"
            />
            <h1 className="large">{fullname}</h1>
            <p className="lead">{email}</p>
            <p className="lead">{skill}</p>
            <p>India</p>
          </div>

          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fab fa-github"></i> Reviews and Ratings
            </h2>

            <div className="repo bg-white p-1 my-1">
              <div>
                <h4>Enter your reviews</h4>
                <form className="form" autoComplete="off">
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Enter your rating out of 5" 
                      name="rating" 
                      required 
                    />
                  </div>
                  <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Add Rating" 
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Indprofile;
