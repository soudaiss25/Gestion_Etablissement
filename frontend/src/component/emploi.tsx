import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Emploi.css";

const API_URL = "http://localhost:8000/api/emplois/";

interface Emploi {
  id: number;
  cours: string;
  professeur: string;
  classe: string;
  jour: string;
  heure_debut: string;
  heure_fin: string;
}

const Emploi = () => {
  const [emplois, setEmplois] = useState<Emploi[]>([]);
  const [cours, setCours] = useState("");
  const [professeur, setProfesseur] = useState("");
  const [classe, setClasse] = useState("");
  const [jour, setJour] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const emploiRes = await axios.get(API_URL);
      setEmplois(emploiRes.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emploiData = { cours, professeur, classe, jour, heure_debut: heureDebut, heure_fin: heureFin };

      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, emploiData);
      } else {
        await axios.post(API_URL, emploiData);
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  const resetForm = () => {
    setCours("");
    setProfesseur("");
    setClasse("");
    setJour("");
    setHeureDebut("");
    setHeureFin("");
    setEditingId(null);
  };

  const handleEdit = (emploi: Emploi) => {
    setCours(emploi.cours);
    setProfesseur(emploi.professeur);
    setClasse(emploi.classe);
    setJour(emploi.jour);
    setHeureDebut(emploi.heure_debut);
    setHeureFin(emploi.heure_fin);
    setEditingId(emploi.id);
  };

  return (
    <div className="container">
      <h2>Gestion de l'Emploi du Temps</h2>

      <div className="form-container">
        <h3>{editingId ? "Modifier" : "Ajouter"} un Emploi</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Cours" value={cours} onChange={(e) => setCours(e.target.value)} required />
          <input type="text" placeholder="Professeur" value={professeur} onChange={(e) => setProfesseur(e.target.value)} required />
          <input type="text" placeholder="Classe" value={classe} onChange={(e) => setClasse(e.target.value)} required />
          <input type="text" placeholder="Jour (ex: Lundi, Mardi...)" value={jour} onChange={(e) => setJour(e.target.value)} required />
          <input type="time" value={heureDebut} onChange={(e) => setHeureDebut(e.target.value)} required />
          <input type="time" value={heureFin} onChange={(e) => setHeureFin(e.target.value)} required />

          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Liste des Emplois du Temps</h3>
        <ul>
          {emplois.map((e) => (
            <li key={e.id}>
              <span>
                <strong>{e.cours}</strong> - {e.professeur} - {e.classe}
                <br />
                {e.jour} | {e.heure_debut} - {e.heure_fin}
              </span>
              <button className="edit-btn" onClick={() => handleEdit(e)}>Modifier</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Emploi;
