import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
  const [data, setData] = useState(null);
  const [review,setReview] = useState ([])
  useEffect(() => {
    axios.get('http://localhost:5000/myprofile', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => setData(res.data))
    axios.get('http://localhost:5000/myreview', {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      }).then(res => setReview(res.data))

  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

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

      {data &&
       <section className="container">
        <Link to="/dashboard" className="btn btn-light">Back To Profiles</Link>
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary p-2">
            <img
              className="round-img my-1"
              src="https://www.gravatar.com/avatar/0000"
              alt="User Avatar"
            />
            <h1 className="large">{data.fullname}</h1>
            <p className="lead">{data.email}</p>
            <p>India</p>
          </div>

          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fab fa-github"></i> Reviews and Ratings
            </h2>

            <div className="repo bg-white p-1 my-1">
            { review ? 
                review.map(review =>
                    <div>
                        <h4><Link to="#" >{review.taskprovider} </Link></h4>
                        <p>
                            {review.rating}/5
                            
                        </p>
                    </div>
                )  : <p>No Reviews added Yet !</p>
            }
            </div>

            <div className="repo bg-white p-1 my-1">
              <div>
                <h4>Enter your reviews</h4>
                <form className="form" autoComplete="off">
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Enter your rating out of 5" 
                      name="rating" 
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
       }
      
    </div>
  );
}

export default Myprofile;
