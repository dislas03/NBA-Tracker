import { useState, useEffect } from 'react';
import Search from './Search';
import TeamStats from '../frontPage/TeamStats';

function TeamSearch() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeamStats, setSelectedTeamStats] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${encodeURIComponent(searchQuery)}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        },
      };
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Result:', result);

        if (Array.isArray(result.response)) {
          setTeams(result.response);
        } else {
          console.error('Teams not found in the API response:', result);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    const fetchTeamStats = async (teamId, selectedSeason) => {
        const parsedSeason = parseInt(selectedSeason);
        if (isNaN(parsedSeason)) {
          console.error('Invalid selectedSeason', selectedSeason);
          return;
        }
      
        const url = `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${teamId}&season=${parsedSeason}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
        };
      
        try {
          const response = await fetch(url, options);
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log(`API Result Team Stats:`, result);
      
          if (result.response.statistics) {
            setSelectedTeamStats(result.response.statistics);
          } else {
            console.error('Team stats not found in the API response:', result);
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      };
      
    fetchData();
    if (selectedSeason && selectedTeamStats) {
      fetchTeamStats(selectedTeamStats.id, selectedSeason);
    }
  }, [searchQuery, selectedSeason, selectedTeamStats]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredTeams([]);
  };

  const handleTeamClick = (team) => {
    setSelectedTeamStats(team.statistics);
  };

  return (
    <div>
      <h2>Team List</h2>
      <Search onSearch={handleSearch} />
      <ul>
        {filteredTeams.length > 0
          ? filteredTeams.map((team) => (
              <li key={team.id} onClick={() => handleTeamClick(team)}>
                {team.name}
              </li>
            ))
          : teams.map((team) => (
              <li key={team.id} onClick={() => handleTeamClick(team)}>
                {team.name}
              </li>
            ))}
      </ul>
      {selectedTeamStats && (
        <div>
          <h2>Selected Team Stats</h2>
          <TeamStats onClick={handleTeamClick} statistics={selectedTeamStats} />
        </div>
      )}
    </div>
  );
}

export default TeamSearch;
