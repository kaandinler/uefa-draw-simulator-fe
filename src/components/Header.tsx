import { Link, useLocation } from 'react-router-dom';
import { Trophy, History, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Competition } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

interface HeaderProps {
  competitions: Competition[];
}

const Header: React.FC<HeaderProps> = ({ competitions }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const getCompetitionName = (id: string) => {
    const competition = competitions.find(c => c.id === id);
    return competition?.name || id;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Trophy className="logo-icon" />
          <h1>{t('header.title')}</h1>
        </div>
        
        <nav className="nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={20} />
            {t('header.home')}
          </Link>
          <Link to="/history" className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}>
            <History size={20} />
            {t('header.history')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
