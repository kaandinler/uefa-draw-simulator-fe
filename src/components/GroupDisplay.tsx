import { motion } from 'framer-motion';
import { Group } from '../types';
import './GroupDisplay.css';

interface GroupDisplayProps {
  groups: Group[];
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ groups }) => {
  const getGroupColor = (groupName: string) => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
      '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
    ];
    const index = groupName.charCodeAt(groupName.length - 1) % colors.length;
    return colors[index];
  };

  return (
    <div className="group-display">
      <h2 className="groups-title">Kura Sonuçları</h2>
      <div className="groups-grid">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            className="group-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ '--group-color': getGroupColor(group.name) } as React.CSSProperties}
          >
            <div className="group-header">
              <h3 className="group-name">{group.name}</h3>
              <div className="group-team-count">{group.teams.length} Takım</div>
            </div>
            
            <div className="group-teams">
              {group.teams.map((team, teamIndex) => (
                <motion.div
                  key={team.id}
                  className="group-team"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + teamIndex * 0.05 }}
                >
                  <div className="team-position">{teamIndex + 1}</div>
                  <div className="team-logo-small">
                    {team.logo ? (
                      <img src={team.logo} alt={`${team.name} logo`} />
                    ) : (
                      <div className="team-logo-placeholder-small">
                        {team.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="team-details">
                    <div className="team-name">{team.name}</div>
                    <div className="team-country">{team.country}</div>
                  </div>
                  <div className="team-coefficient">{team.coefficient}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroupDisplay;
