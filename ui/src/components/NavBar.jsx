import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/players">Players</Link>
        <Link to="/comps">Comps</Link>

    </nav>
  );
}

export default NavBar;