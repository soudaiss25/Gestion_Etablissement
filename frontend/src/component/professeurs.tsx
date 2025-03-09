import { useEffect, useState } from "react";
import axios from "axios";
import '../css/proffesseur.css'

const API_URL = "http://localhost:8000/api/professeurs/"; // Remplace par ton URL

interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
}


const Professeur = () => {
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Charger les professeurs
  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const fetchProfesseurs = async () => {
    try {
      const response = await axios.get(API_URL);
      setProfesseurs(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des professeurs", error);
    }
  };

  // Ajouter ou modifier un professeur
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const professeur = { nom, prenom, email, specialite };
      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, professeur);
      } else {
        await axios.post(API_URL, professeur);
      }
      setNom("");
      setPrenom("");
      setEmail("");
      setSpecialite("");
      setEditingId(null);
      fetchProfesseurs();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  // Supprimer un professeur
  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous supprimer ce professeur ?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchProfesseurs();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  // Remplir le formulaire pour la modification
  const handleEdit = (prof: Professeur) => {
    setNom(prof.nom);
    setPrenom(prof.prenom);
    setEmail(prof.email);
    setSpecialite(prof.specialite);
    setEditingId(prof.id);
  };

  return (
    <div className="container">
      <h2>Gestion des Professeurs</h2>

      {/* Formulaire d'ajout/modification */}
      <div className="form-container">
        <h3>{editingId ? "Modifier" : "Ajouter"} un Professeur</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Spécialité"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>

      {/* Liste des professeurs */}
      <div className="list-container">
        <h3>Liste des Professeurs</h3>
        <ul>
          {professeurs.map((prof) => (
            <li key={prof.id}>
              <strong>{prof.nom} {prof.prenom}</strong> - {prof.email} - {prof.specialite}
              <button onClick={() => handleEdit(prof)}>Modifier</button>
              <button onClick={() => handleDelete(prof.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Professeur;
