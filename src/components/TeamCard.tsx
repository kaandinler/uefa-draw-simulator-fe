import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Team } from '../types';
import './TeamCard.css';

interface TeamCardProps {
  team: Team;
  type: 'seed' | 'unseed';
}

const TeamCard: React.FC<TeamCardProps> = ({ team, type }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className={`team-card ${type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="team-logo">
        {team.logo ? (
          <img src={team.logo} alt={`${team.name} logo`} />
        ) : (
          <div className="team-logo-placeholder">
            {team.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="team-info">
        <h4 className="team-name">{team.name}</h4>
        <p className="team-country">{team.country}</p>
        <p className="team-league">{team.league}</p>
        <div className="team-coefficient">
          <span>{t('teamCard.coefficient')}: {team.coefficient}</span>
        </div>
      </div>
      
      <div className="team-type-badge">
        {type === 'seed' ? t('teamCard.seed') : t('teamCard.unseed')}
      </div>
    </motion.div>
  );
};

export default TeamCard;
