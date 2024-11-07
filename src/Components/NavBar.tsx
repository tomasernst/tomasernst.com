import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/" className="navbar-name">Tomás Ernst</Link>
                </div>
                <div className="navbar-right">
                    <Link to="/bucketlist" className="navbar-link">Bucket List</Link>
                    <Link to="/worldmap" className="navbar-link">World Map</Link>
                    <Link to="/minesweeper" className="navbar-link">Minesweeper</Link>
                </div>
            </nav>
        </div>
    );
}
