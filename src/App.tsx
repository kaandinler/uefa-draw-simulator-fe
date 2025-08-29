import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Home from './pages/Home';
import DrawSimulator from './pages/DrawSimulator';
import DrawHistory from './pages/DrawHistory';
import { Competition } from './types';
import { competitionsApi } from './services/api';
import './i18n';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await competitionsApi.getAll();
        setCompetitions(data);
      } catch (error) {
        console.error('Yarışmalar yüklenirken hata oluştu:', error);
        // Fallback data for development
        setCompetitions([
          {
            id: 'champions-league',
            name: 'UEFA Şampiyonlar Ligi',
            description: 'Avrupa\'nın en prestijli kulüp turnuvası',
            groupCount: 8,
            teamsPerGroup: 4,
            totalTeams: 32,
          },
          {
            id: 'europa-league',
            name: 'UEFA Avrupa Ligi',
            description: 'Avrupa\'nın ikinci seviye kulüp turnuvası',
            groupCount: 8,
            teamsPerGroup: 4,
            totalTeams: 32,
          },
          {
            id: 'conference-league',
            name: 'UEFA Konferans Ligi',
            description: 'Avrupa\'nın üçüncü seviye kulüp turnuvası',
            groupCount: 8,
            teamsPerGroup: 4,
            totalTeams: 32,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header competitions={competitions} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home competitions={competitions} />} />
            <Route path="/draw/:competitionId" element={<DrawSimulator />} />
            <Route path="/history" element={<DrawHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
