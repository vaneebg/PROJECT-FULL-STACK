import { useSelector } from "react-redux";
import {Link } from "react-router-dom";
import './Header.scss'

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
  <>
      <div className='header'>Red Anti-social VB</div>
      {user?.user.role === 'admin' ? <span><Link
to="/admin">Admin</Link></span>:''}
<hr />
      </>
  );
};

export default Header;