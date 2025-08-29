import { Link } from 'react-router-dom';
import { Trophy, Users, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Competition } from '../types';
import './Home.css';

interface HomeProps {
  competitions: Competition[];
}

const Home: React.FC<HomeProps> = ({ competitions }) => {
  const { t } = useTranslation();

  const getCompetitionIcon = (id: string) => {
    switch (id) {
      case 'champions-league':
        return '🏆';
      case 'europa-league':
        return '🥈';
      case 'conference-league':
        return '🥉';
      default:
        return '⚽';
    }
  };

  const getCompetitionColor = (id: string) => {
    switch (id) {
      case 'champions-league':
        return '#ffd700';
      case 'europa-league':
        return '#ff6b35';
      case 'conference-league':
        return '#4ecdc4';
      default:
        return '#666';
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>{t('home.hero.title')}</h1>
        <p>{t('home.hero.subtitle')}</p>
      </div>

      <div className="competitions-grid">
        {competitions.map((competition) => (
          <Link
            key={competition.id}
            to={`/draw/${competition.id}`}
            className="competition-card"
            style={{ '--accent-color': getCompetitionColor(competition.id) } as React.CSSProperties}
          >
            <div className="competition-icon">
              {getCompetitionIcon(competition.id)}
            </div>
            <h3>{competition.name}</h3>
            <p>{competition.description}</p>
            <div className="competition-stats">
              <div className="stat">
                <Users size={16} />
                <span>{competition.totalTeams} {t('common.teams')}</span>
              </div>
              <div className="stat">
                <Target size={16} />
                <span>{competition.groupCount} {t('common.groups')}</span>
              </div>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="features">
        <h2>{t('home.features.title')}</h2>
        <div className="features-grid">
          <div className="feature">
            <Trophy className="feature-icon" />
            <h3>{t('home.features.realisticDraw.title')}</h3>
            <p>{t('home.features.realisticDraw.description')}</p>
          </div>
          <div className="feature">
            <Users className="feature-icon" />
            <h3>{t('home.features.groupManagement.title')}</h3>
            <p>{t('home.features.groupManagement.description')}</p>
          </div>
          <div className="feature">
            <Target className="feature-icon" />
            <h3>{t('home.features.historyTracking.title')}</h3>
            <p>{t('home.features.historyTracking.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
