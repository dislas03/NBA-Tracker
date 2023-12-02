import './App.css';
import Header from './components/Header.js'
import Nav from './components/nav/Nav';
import TeamList from './components/nav/TeamList';
import TeamSearch from './components/nav/TeamSearch';


function App() {
  const handleSearch = (query) =>{
    console.log(`Searching for: ${query}`)
  }
  return (
    <div>
      <Header />
      <Nav />
      <div>
        <TeamSearch onSearch={handleSearch}/>
      </div>
        <TeamList />
    </div>
    
  );
}

export default App;
