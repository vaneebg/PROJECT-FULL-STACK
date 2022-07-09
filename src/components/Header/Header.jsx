import { useSelector } from "react-redux";
import {Link } from "react-router-dom";
import './Header.scss'

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
  <>
      <div className='header'>header</div>
      <i className="fa-solid fa-circle-plus fa-beat"></i>
      {user?.user.role === 'admin' ? <span><Link
to="/admin">Admin</Link></span>:''}
      </>
  );
};

export default Header;