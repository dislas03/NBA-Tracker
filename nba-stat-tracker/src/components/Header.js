import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
function Header() {
    
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState()

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

                if(!result.response || !Array.isArray(result.response)){
                    console.error('Unexpected API response format:', result)
                    return;
                }

                setSeasons(result.response);

                const initialSeason = result.response.find(season => season === 2023);
                setSelectedSeason(initialSeason)

                console.log('Seasons:', result.response)
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