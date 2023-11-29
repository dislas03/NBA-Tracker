import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
function Header() {
    
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null)

    useEffect(() => { 
       const fetchData = async () => {

           const url = 'https://api-nba-v1.p.rapidapi.com/seasons'
           const options = {
               method: 'GET',
               headers: {
                   'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                   'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                }
            };
            
            try{
                const response = await fetch(url, options);
                console.log('API Response:', response)
                
                if(!response.ok) {
                    console.error('Error fetching data. Status:', response.status)

                    const responseBody = await response.text();
                    console.log('Response Body:', responseBody);
                    return;
                }

                const result = await response.json();
                console.log('API Result:', result);

                if(!result.api || !result.api.seasons){
                    console.error('Unexpected API response format:', result)
                    return;
                }

                setSeasons(result.api.seasons);

                const initialSeason = result.api.seasons.find(season => season.value === 2022);
                setSelectedSeason(initialSeason)

                console.log('Seasons:', result.api.seasons)
            } catch (error) {
                console.error('Fetch Error:',error)
            }
        } 
        fetchData();
    }, []);

    const handleSeasonSelect = (selectedOption) => {
        setSelectedSeason(selectedOption);
    }
    
    return(
        <div> 
            <h3>NBA Stats {selectedSeason ? `- ${selectedSeason} Season` : ''}</h3>
            <DropdownMenu options={seasons} onSelect={handleSeasonSelect} />
        </div>
        
    )
};

export default Header