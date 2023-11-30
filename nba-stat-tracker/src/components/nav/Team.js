
const Team = ({ team }) => {
    return (
        <div> 
            <h3>{team.name}</h3>
            <h1>{team.players}</h1>
        </div>
    )
}

export default Team