import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profiles only once when the component mounts
    axios.get('http://localhost:5000/allprofiles', {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => setData(res.data))
    .catch(err => {
      console.error("Error fetching profiles:", err);
      // Optional: Handle errors, maybe navigate to login if unauthorized
    });
  }, []); // Empty dependency array means this useEffect runs once after the component mounts

  // Redirect to login if no token is found
  if (!localStorage.getItem('token')) {
    navigate('/login');
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
          <li><Link to="/myprofile">My profile</Link></li>
          <li>
            <Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link>
          </li>
        </ul>
      </nav>

      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>

        <div className="profiles">
          {data.length >= 1 ? (
            data.map(profile => (
              <div className='profile bg-light' key={profile.id}>
                <img className='round-img'
                  src='' // You should replace this with an actual image URL
                  alt=''
                />
                {/*  */}
                <div>
                  <h2>{profile.fullname}</h2>
                  <p>{profile.email}</p>
                  <p>India</p>
                  <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}`} className="btn btn-primary">
                        View Profile </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No profiles found</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
