import { useEffect, useState } from "react";
import axios from "axios";
import "../css/cours.css"; 

const API_URL = "http://localhost:8000/api/cours/"; 

interface Cours {
  id: number;
  nom: string;
  description: string;
  credits: number;
}

const Cours = () => {
  const [cours, setCours] = useState<Cours[]>([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Charger les cours
  useEffect(() => {
    fetchCours();
  }, []);

  const fetchCours = async () => {
    try {
      const response = await axios.get(API_URL);
      setCours(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des cours", error);
    }
  };

  // Ajouter ou modifier un cours
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const coursData = { nom, description, credits: Number(credits) };
      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, coursData);
      } else {
        await axios.post(API_URL, coursData);
      }
      setNom("");
      setDescription("");
      setCredits("");
      setEditingId(null);
      fetchCours();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  // Supprimer un cours
  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous supprimer ce cours ?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchCours();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  // Remplir le formulaire pour la modification
  const handleEdit = (cours: Cours) => {
    setNom(cours.nom);
    setDescription(cours.description);
    setCredits(cours.credits);
    setEditingId(cours.id);
  };

  return (
    <div className="container">
      <h2>Gestion des Cours</h2>

      {/* Formulaire d'ajout/modification */}
      <div className="form-container">
        <h3>{editingId ? "Modifier" : "Ajouter"} un Cours</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du cours"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Crédits"
            value={credits}
            onChange={(e) => setCredits(e.target.value ? Number(e.target.value) : "")}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>

      {/* Liste des cours */}
      <div className="list-container">
        <h3>Liste des Cours</h3>
        <ul>
          {cours.map((c) => (
            <li key={c.id}>
              <div>
                <strong>{c.nom}</strong> ({c.credits} crédits)
                <p>{c.description}</p>
              </div>
              <button className="edit-btn" onClick={() => handleEdit(c)}>Modifier</button>
              <button className="delete-btn" onClick={() => handleDelete(c.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cours;
