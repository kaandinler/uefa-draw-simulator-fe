import { Link } from 'react-router-dom';
import { Trophy, Users, Target } from 'lucide-react';
import { Competition } from '../types';
import './Home.css';

interface HomeProps {
  competitions: Competition[];
}

const Home: React.FC<HomeProps> = ({ competitions }) => {
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
        <h1>UEFA Kura Çekimi Simülatörü</h1>
        <p>Avrupa'nın en prestijli kulüp turnuvaları için kura çekimi yapın</p>
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
                <span>{competition.totalTeams} Takım</span>
              </div>
              <div className="stat">
                <Target size={16} />
                <span>{competition.groupCount} Grup</span>
              </div>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="features">
        <h2>Özellikler</h2>
        <div className="features-grid">
          <div className="feature">
            <Trophy className="feature-icon" />
            <h3>Gerçekçi Kura</h3>
            <p>UEFA kurallarına uygun kura çekimi algoritması</p>
          </div>
          <div className="feature">
            <Users className="feature-icon" />
            <h3>Grup Yönetimi</h3>
            <p>Otomatik grup oluşturma ve kısıtlama kontrolü</p>
          </div>
          <div className="feature">
            <Target className="feature-icon" />
            <h3>Geçmiş Takip</h3>
            <p>Önceki kura çekimlerini görüntüleme ve karşılaştırma</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
