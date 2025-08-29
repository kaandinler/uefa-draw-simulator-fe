import axios from 'axios';
import { Team, DrawResult, Competition, DrawSettings } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const competitionsApi = {
  getAll: async (): Promise<Competition[]> => {
    const response = await api.get('/competitions');
    return response.data;
  },

  getById: async (id: string): Promise<Competition> => {
    const response = await api.get(`/competitions/${id}`);
    return response.data;
  },
};

export const teamsApi = {
  getByCompetition: async (competitionId: string): Promise<Team[]> => {
    const response = await api.get(`/teams/competition/${competitionId}`);
    return response.data;
  },

  getSeedTeams: async (competitionId: string): Promise<Team[]> => {
    const response = await api.get(`/teams/competition/${competitionId}/seeds`);
    return response.data;
  },

  getUnseedTeams: async (competitionId: string): Promise<Team[]> => {
    const response = await api.get(`/teams/competition/${competitionId}/unseeds`);
    return response.data;
  },
};

export const drawApi = {
  performDraw: async (settings: DrawSettings): Promise<DrawResult> => {
    const response = await api.post('/draw', settings);
    return response.data;
  },

  getDrawHistory: async (competitionId?: string): Promise<DrawResult[]> => {
    const params = competitionId ? { competition: competitionId } : {};
    const response = await api.get('/draw/history', { params });
    return response.data;
  },

  getDrawById: async (drawId: string): Promise<DrawResult> => {
    const response = await api.get(`/draw/${drawId}`);
    return response.data;
  },
};

export default api;
