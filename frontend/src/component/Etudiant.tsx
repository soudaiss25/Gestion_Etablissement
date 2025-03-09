import { useEffect, useState } from "react";
import axios from "axios";
import "../css/etudiant.css";

interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: string;
  telephone: string;
  classEtudiant?: Class | null; // Ajout de la classe complète ici
}

interface Class {
  id: number;
  nom: string;
}

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_naissance: string;
  classEtudiant: string;
}

const API_URL = "http://127.0.0.1:8000/api/etudiants/";
const CLASSES_API_URL = "http://127.0.0.1:8000/api/classes/";

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    date_naissance: "",
    classEtudiant: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEtudiants();
    fetchClasses();
  }, []);

  const fetchEtudiants = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Student[]>(API_URL);
      setEtudiants(response.data);
      setError(null);
    } catch (error) {
      setError("Erreur lors du chargement des étudiants");
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get<Class[]>(CLASSES_API_URL);
      setClasses(response.data);
    } catch (error) {
      setError("Erreur lors du chargement des classes");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement; // Cast de e.target pour accéder à 'value'
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchEtudiants();
      resetForm();
      setError(null);
    } catch (error) {
      setError("Erreur lors de l'enregistrement de l'étudiant");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchEtudiants();
    } catch (error) {
      setError("Erreur lors de la suppression de l'étudiant");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (etudiant: Student) => {
    setEditingId(etudiant.id);
    setFormData({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      telephone: etudiant.telephone,
      date_naissance: etudiant.date_naissance,
      classEtudiant: etudiant.classEtudiant ? etudiant.classEtudiant.id.toString() : "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      date_naissance: "",
      classEtudiant: "",
    });
  };

  return (
    <div className="container">
      <h2>Gestion des Étudiants</h2>
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-spinner">Chargement...</div>}

      <div className="layout">
        <div className="student-list">
          <h3>Liste des Étudiants</h3>
          <ul>
            {etudiants.map((etudiant) => (
              <li key={etudiant.id} className="student-item">
                <div>
                  <strong>{etudiant.nom} {etudiant.prenom}</strong> - {etudiant.email} - {etudiant.telephone} -  
                  Classe: {etudiant.classEtudiant ? etudiant.classEtudiant.nom : "Non assigné"}
                </div>
                <button onClick={() => handleEdit(etudiant)} className="edit-button">Modifier</button>
                <button onClick={() => handleDelete(etudiant.id)} className="delete-button">Supprimer</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-student-form">
          <form onSubmit={handleSubmit}>
            <h3>{editingId ? "Modifier" : "Ajouter"} un Étudiant</h3>
            <label>
              Nom:
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </label>
            <label>
              Prénom:
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Téléphone:
              <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
            </label>
            <label>
              Date de naissance:
              <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
            </label>
            <label>
              Classe:
              <select name="classEtudiant" value={formData.classEtudiant} onChange={handleChange} required>
                <option value="">Sélectionnez une classe</option>
                {classes.map((classe) => (
                  <option key={classe.id} value={classe.id}>{classe.nom}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="submit-button">{editingId ? "Modifier" : "Ajouter"}</button>
            {editingId && <button type="button" className="cancel-button" onClick={resetForm}>Annuler</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Etudiants;
