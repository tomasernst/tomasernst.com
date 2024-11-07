import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-name">Tomás Ernst</h1>
            </div>
            <div className="navbar-right">
                <Link to="/bucketlist" className="navbar-link">Bucket List</Link>
                <Link to="/worldmap" className="navbar-link">World Map</Link>
                <Link to="/minesweeper" className="navbar-link">Minesweeper</Link>
            </div>
        </nav>
    );
}
