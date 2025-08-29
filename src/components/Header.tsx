import { Link, useLocation } from 'react-router-dom';
import { Trophy, History, Home } from 'lucide-react';
import { Competition } from '../types';
import './Header.css';

interface HeaderProps {
  competitions: Competition[];
}

const Header: React.FC<HeaderProps> = ({ competitions }) => {
  const location = useLocation();

  const getCompetitionName = (id: string) => {
    const competition = competitions.find(c => c.id === id);
    return competition?.name || id;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Trophy className="logo-icon" />
          <h1>UEFA Kura Simülatörü</h1>
        </div>
        
        <nav className="nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={20} />
            Ana Sayfa
          </Link>
          <Link to="/history" className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}>
            <History size={20} />
            Geçmiş
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
