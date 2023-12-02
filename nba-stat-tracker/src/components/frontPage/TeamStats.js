

function TeamStats({statistics}){
    
    return (
        <div className="team-statistics">
            <h3>Team Statistics</h3>
            <ul>
                <li>
                    Games Played: {statistics.games}
                </li>
                <li>
                    Total Points: {statistics.points}
                </li>
                <li>
                    Points In the Paint: {statistics.pointsInPaint}
                </li>
                <li>
                    Fast Break Points: {statistics.fastBreakPoints}
                </li>
                <li>
                    Points Off Turnovers: {statistics.pointsOffTurnovers}
                </li>
                <li>
                    Total Rebounds: {statistics.totReb}
                </li>
                <li>
                    Total Blocks: {statistics.blocks}
                </li>
                <li>
                    Total Steals: {statistics.steals}
                </li>
                <li>
                    Total Assits: {statistics.assits}
                </li>
                <li>
                    Total Fouls: {statistics.pFouls}
                </li>
            </ul>
        </div>
    )
}

export default TeamStats