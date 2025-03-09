
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Etudiants from './component/Etudiant';
import Professeur from './component/professeurs';
import Classe from './component/classe';
import Emploi from './component/emploi';
 import Cours from './component/Cours';
import './App.css'; // Assure-toi d'importer ton CSS

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar améliorée */}
        <nav className="navbar">
          <a href="/" className="logo">Gestion Établissement</a>
          <ul>
            <li><Link to="/">Étudiants</Link></li>
            <li><Link to="/professeur">Professeur</Link></li>
            <li><Link to="/emploi-du-temps">Emploi du Temps</Link></li>
            <li><Link to="/classe">Classe</Link></li>
            <li><Link to="/cours">Cours</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Etudiants />} />
          <Route path="/professeur" element={<Professeur />} />
           { <Route path="/emploi-du-temps" element={<Emploi />} /> }
          <Route path="/classe" element={<Classe />} />
          { <Route path="/cours" element={<Cours />} />  }
        </Routes>
      </div>
    </Router>
  );
};

export default App;
