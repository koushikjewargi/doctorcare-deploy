import { Link } from 'react-router-dom';
import '../styles.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="menu-item active" to="/">Diagnostics</Link>
      <Link className="menu-item" to="/history">History</Link>
    </aside>
  );
}
