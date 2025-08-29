import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Play, RotateCcw, ArrowLeft, Users, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Team, DrawResult, Competition } from '../types';
import { teamsApi, drawApi, competitionsApi } from '../services/api';
import TeamCard from '../components/TeamCard';
import GroupDisplay from '../components/GroupDisplay';
import './DrawSimulator.css';

const DrawSimulator: React.FC = () => {
  const { competitionId } = useParams<{ competitionId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [seedTeams, setSeedTeams] = useState<Team[]>([]);
  const [unseedTeams, setUnseedTeams] = useState<Team[]>([]);
  const [drawResult, setDrawResult] = useState<DrawResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) return;
      
      try {
        setLoading(true);
        const [compData, seedData, unseedData] = await Promise.all([
          competitionsApi.getById(competitionId),
          teamsApi.getSeedTeams(competitionId),
          teamsApi.getUnseedTeams(competitionId)
        ]);
        
        setCompetition(compData);
        setSeedTeams(seedData);
        setUnseedTeams(unseedData);
      } catch (err) {
        console.error('Veri yüklenirken hata:', err);
        setError(t('drawSimulator.errorLoadingData'));
        
        // Fallback data for development
        setCompetition({
          id: competitionId as any,
          name: competitionId === 'champions-league' ? 'UEFA Şampiyonlar Ligi' : 
                competitionId === 'europa-league' ? 'UEFA Avrupa Ligi' : 'UEFA Konferans Ligi',
          description: 'Kura çekimi simülatörü',
          groupCount: 8,
          teamsPerGroup: 4,
          totalTeams: 32
        });
        
        setSeedTeams([
          { id: 1, name: 'Manchester City', country: 'İngiltere', league: 'Premier League', coefficient: 100.0 },
          { id: 2, name: 'Real Madrid', country: 'İspanya', league: 'La Liga', coefficient: 95.0 },
          { id: 3, name: 'Bayern Munich', country: 'Almanya', league: 'Bundesliga', coefficient: 90.0 },
          { id: 4, name: 'PSG', country: 'Fransa', league: 'Ligue 1', coefficient: 85.0 },
        ]);
        
        setUnseedTeams([
          { id: 5, name: 'Arsenal', country: 'İngiltere', league: 'Premier League', coefficient: 80.0 },
          { id: 6, name: 'Barcelona', country: 'İspanya', league: 'La Liga', coefficient: 75.0 },
          { id: 7, name: 'Borussia Dortmund', country: 'Almanya', league: 'Bundesliga', coefficient: 70.0 },
          { id: 8, name: 'AC Milan', country: 'İtalya', league: 'Serie A', coefficient: 65.0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [competitionId]);

  const performDraw = async () => {
    if (!competition) return;
    
    setIsDrawing(true);
    try {
      const result = await drawApi.performDraw({
        competition: competition.id,
        seedTeams,
        unseedTeams
      });
      setDrawResult(result);
    } catch (err) {
      console.error('Kura çekimi sırasında hata:', err);
      setError(t('drawSimulator.errorPerformingDraw'));
    } finally {
      setIsDrawing(false);
    }
  };

  const resetDraw = () => {
    setDrawResult(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('drawSimulator.loadingTeams')}</p>
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
    <div className="draw-simulator">
      <div className="draw-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <div className="competition-info">
          <Trophy className="competition-icon" />
          <h1>{competition?.name}</h1>
          <p>{competition?.description}</p>
        </div>
      </div>

      <div className="draw-content">
        <div className="teams-section">
          <div className="teams-container">
            <div className="team-group">
              <h3>
                <Users size={20} />
                {t('drawSimulator.seedTeams')} ({seedTeams.length})
              </h3>
              <div className="teams-grid">
                {seedTeams.map((team) => (
                  <TeamCard key={team.id} team={team} type="seed" />
                ))}
              </div>
            </div>

            <div className="team-group">
              <h3>
                <Users size={20} />
                {t('drawSimulator.unseedTeams')} ({unseedTeams.length})
              </h3>
              <div className="teams-grid">
                {unseedTeams.map((team) => (
                  <TeamCard key={team.id} team={team} type="unseed" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="draw-controls">
          <AnimatePresence>
            {!drawResult ? (
              <motion.div
                key="draw-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="draw-button-container"
              >
                <button
                  className="draw-button"
                  onClick={performDraw}
                  disabled={isDrawing}
                >
                  {isDrawing ? (
                    <>
                      <div className="spinner"></div>
                      {t('drawSimulator.drawing')}
                    </>
                  ) : (
                    <>
                      <Shuffle size={24} />
                      {t('drawSimulator.drawButton')}
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="reset-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="reset-button-container"
              >
                <button className="reset-button" onClick={resetDraw}>
                  <RotateCcw size={20} />
                  {t('drawSimulator.newDraw')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {drawResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="draw-results"
            >
              <GroupDisplay groups={drawResult.groups} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DrawSimulator;
