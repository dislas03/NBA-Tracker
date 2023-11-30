import './App.css';
import Header from './components/Header.js'
import Nav from './components/nav/Nav';
import TeamList from './components/nav/TeamList';


function App() {
  return (
    <div>
      <Header />
      <Nav />
      <div>
        <TeamList />
      </div>
    </div>
    
  );
}

export default App;
