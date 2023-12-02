import { useState, useEffect } from 'react';
import DropdownMenu from '../DropdownMenu';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api-nba-v1.p.rapidapi.com/teams`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
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
          setTeamsList(result.response.map(team => team.name));
        } else {
          console.error('Teams not found in the API response:', result);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <h2>Team List</h2>
      <button onClick={toggleDropdown}>Team List</button>
      {isDropdownOpen && <DropdownMenu options={teamsList} />}
      <ul style={{ display: isDropdownOpen ? 'none' : 'block' }}>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;




