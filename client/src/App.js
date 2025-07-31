import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticipantList from './pages/ParticipantList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParticipantList />} />
      </Routes>
    </Router>
  );
}

export default App;