import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeamList from './pages/Teams/TeamList';
import TeamDetails from './pages/Teams/TeamDetails';
import CreateTeam from './pages/Teams/CreateTeam';
import EditTeam from './pages/Teams/EditTeam';
import PlayerList from './pages/Players/PlayerList';
import PlayerDetails from './pages/Players/PlayerDetails';
import AddPlayer from './pages/Players/AddPlayer';
import EditPlayer from './pages/Players/EditPlayer';
import CompList from './pages/Comps/CompList';
import CompDetails from './pages/Comps/CompDetails';
import CreateComp from './pages/Comps/CreateComp';
import SelectTeamForComp from './pages/Comps/SelectTeamForComp';
import EditComp from './pages/Comps/EditComp';
import TeamCompDetails from './pages/Comps/TeamCompDetails';
import AssignComp from './pages/Comps/AssignComp';
import NavBar from './components/NavBar';
import './App.css'

function App() {

  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<TeamList />} />
      <Route path="/teams/:id" element={<TeamDetails />} />
      <Route path="/teams/create" element={<CreateTeam />} />
      <Route path="/teams/:id/edit" element={<EditTeam />} />

      <Route path="/players" element={<PlayerList />} />
      <Route path="/players/create" element={<AddPlayer />} />
      <Route path="/players/:id/edit" element={<EditPlayer />} />
      <Route path="/players/:id" element={<PlayerDetails />} />

      <Route path="/comps" element={<CompList />} />
      <Route path="/comps/:id" element={<CompDetails />} />
      <Route path="/comps/create" element={<CreateComp />} />
      <Route path="/comps/:id/edit" element={<EditComp />} />

      <Route path="/comps/:comp_id/assign/:team_id" element={<AssignComp />} />
      <Route path="/team_comps/:id/details" element={<TeamCompDetails />} />
      <Route path="/comps/:comp_id/assign/select" element={<SelectTeamForComp />} />
    </Routes>
  </Router>
  );
}

export default App
