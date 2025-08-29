export interface Team {
  id: number;
  name: string;
  country: string;
  league: string;
  coefficient: number;
  logo?: string;
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
}

export interface DrawResult {
  id: string;
  competition: CompetitionType;
  groups: Group[];
  createdAt: string;
}

export type CompetitionType = 'champions-league' | 'europa-league' | 'conference-league';

export interface Competition {
  id: CompetitionType;
  name: string;
  description: string;
  groupCount: number;
  teamsPerGroup: number;
  totalTeams: number;
  logo?: string;
}

export interface DrawSettings {
  competition: CompetitionType;
  seedTeams: Team[];
  unseedTeams: Team[];
  restrictions?: DrawRestriction[];
}

export interface DrawRestriction {
  type: 'country' | 'league';
  value: string;
  description: string;
}
