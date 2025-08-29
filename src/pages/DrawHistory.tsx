import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DrawResult, CompetitionType } from '../types';
import { drawApi, competitionsApi } from '../services/api';
import GroupDisplay from '../components/GroupDisplay';
import './DrawHistory.css';

const DrawHistory: React.FC = () => {
  const { t } = useTranslation();
  const [drawHistory, setDrawHistory] = useState<DrawResult[]>([]);
  const [competitions, setCompetitions] = useState<{ id: CompetitionType; name: string }[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [historyData, compsData] = await Promise.all([
          drawApi.getDrawHistory(),
          competitionsApi.getAll()
        ]);
        
        setDrawHistory(historyData);
        setCompetitions(compsData);
      } catch (err) {
        console.error('Geçmiş yüklenirken hata:', err);
        setError(t('drawHistory.errorLoadingHistory'));
        
        // Fallback data for development
        setDrawHistory([
          {
            id: '1',
            competition: 'champions-league',
            groups: [
              {
                id: 'A',
                name: 'Grup A',
                teams: [
                  { id: 1, name: 'Manchester City', country: 'İngiltere', league: 'Premier League', coefficient: 100.0 },
                  { id: 2, name: 'Real Madrid', country: 'İspanya', league: 'La Liga', coefficient: 95.0 },
                  { id: 3, name: 'Bayern Munich', country: 'Almanya', league: 'Bundesliga', coefficient: 90.0 },
                  { id: 4, name: 'PSG', country: 'Fransa', league: 'Ligue 1', coefficient: 85.0 },
                ]
              },
              {
                id: 'B',
                name: 'Grup B',
                teams: [
                  { id: 5, name: 'Arsenal', country: 'İngiltere', league: 'Premier League', coefficient: 80.0 },
                  { id: 6, name: 'Barcelona', country: 'İspanya', league: 'La Liga', coefficient: 75.0 },
                  { id: 7, name: 'Borussia Dortmund', country: 'Almanya', league: 'Bundesliga', coefficient: 70.0 },
                  { id: 8, name: 'AC Milan', country: 'İtalya', league: 'Serie A', coefficient: 65.0 },
                ]
              }
            ],
            createdAt: new Date().toISOString()
          }
        ]);
        
        setCompetitions([
          { id: 'champions-league', name: 'UEFA Şampiyonlar Ligi' },
          { id: 'europa-league', name: 'UEFA Avrupa Ligi' },
          { id: 'conference-league', name: 'UEFA Konferans Ligi' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredHistory = selectedCompetition === 'all' 
    ? drawHistory 
    : drawHistory.filter(draw => draw.competition === selectedCompetition);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCompetitionName = (id: CompetitionType) => {
    const competition = competitions.find(c => c.id === id);
    return competition?.name || id;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('drawHistory.loadingHistory')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tekrar Dene</button>
      </div>
    );
  }

  return (
    <div className="draw-history">
      <div className="history-header">
        <h1>{t('drawHistory.title')}</h1>
        <p>{t('drawHistory.subtitle')}</p>
      </div>

      <div className="history-filters">
        <div className="filter-group">
          <Filter size={20} />
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="competition-filter"
          >
            <option value="all">{t('drawHistory.allCompetitions')}</option>
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <Calendar size={64} />
          <h3>{t('drawHistory.noDrawsYet')}</h3>
          <p>{t('drawHistory.noDrawsDescription')}</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredHistory.map((draw, index) => (
            <motion.div
              key={draw.id}
              className="history-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="history-item-header">
                <div className="draw-info">
                  <h3>{getCompetitionName(draw.competition)}</h3>
                  <div className="draw-meta">
                    <Clock size={16} />
                    <span>{formatDate(draw.createdAt)}</span>
                  </div>
                </div>
                <div className="draw-stats">
                  <span>{draw.groups.length} {t('drawHistory.groupCount')}</span>
                  <span>{draw.groups.reduce((total, group) => total + group.teams.length, 0)} {t('drawHistory.teamCount')}</span>
                </div>
              </div>
              
              <div className="history-item-content">
                <GroupDisplay groups={draw.groups} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrawHistory;
