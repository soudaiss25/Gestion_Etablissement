import { useEffect, useState } from "react";
import axios from "axios";
import '../css/classe.css'

interface Classe {
  id: number;
  nom: string;
}

const Classe = () => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [nomClasse, setNomClasse] = useState("");

  const API_URL = "http://localhost:8000/api/classes/";

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(API_URL);
      setClasses(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des classes :", error);
    }
  };

  const ajouterClasse = async () => {
    if (!nomClasse.trim()) return;

    try {
      const response = await axios.post(API_URL, { nom: nomClasse });
      setClasses([...classes, response.data]);
      setNomClasse("");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const supprimerClasse = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setClasses(classes.filter((classe) => classe.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="container">
      <h2>Gestion des Classes</h2>

      <div className="class-management">
        {/* Liste des classes */}
        <div className="class-list">
          <h3>Liste des Classes</h3>
          {classes.map((classe) => (
            <div key={classe.id} className="class-item">
              <span>{classe.nom}</span>
              <button onClick={() => supprimerClasse(classe.id)}>🗑</button>
            </div>
          ))}
        </div>

        {/* Formulaire d'ajout à droite */}
        <div className="add-class-form">
          <h3>Ajouter une Classe</h3>
          <input
            type="text"
            placeholder="Nom de la classe"
            value={nomClasse}
            onChange={(e) => setNomClasse(e.target.value)}
          />
          <button onClick={ajouterClasse}>➕ Ajouter</button>
        </div>
      </div>
    </div>
  );
};

export default Classe;
