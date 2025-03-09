import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Etudiants from "./Etudiant"; // Assurez-vous que le chemin est correct
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Création d'un mock pour l'API axios
const mock = new MockAdapter(axios);

describe("Etudiants Component", () => {
  const mockEtudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com", date_naissance: "2000-01-01", telephone: "123456789", classEtudiant: { id: 1, nom: "Informatique" } },
    { id: 2, nom: "Martin", prenom: "Paul", email: "paul.martin@example.com", date_naissance: "2001-02-02", telephone: "987654321", classEtudiant: { id: 2, nom: "Mathematiques" } },
  ];

  const mockClasses = [
    { id: 1, nom: "Informatique" },
    { id: 2, nom: "Mathematiques" },
  ];

  beforeEach(() => {
    // Réinitialisation du mock avant chaque test
    mock.reset();
    mock.onGet("http://127.0.0.1:8000/api/etudiants/").reply(200, mockEtudiants);
    mock.onGet("http://127.0.0.1:8000/api/classes/").reply(200, mockClasses);
  });

  test("devrait afficher les étudiants et les classes", async () => {
    render(<Etudiants />);

    // Attente que les étudiants et les classes soient chargés
    await waitFor(() => screen.getByText("Liste des Étudiants"));

    // Vérification que la liste des étudiants est affichée
    expect(screen.getByText("Dupont Jean")).toBeInTheDocument();
    expect(screen.getByText("Informatique")).toBeInTheDocument();
    expect(screen.getByText("Martin Paul")).toBeInTheDocument();
    expect(screen.getByText("Mathematiques")).toBeInTheDocument();
  });

  test("devrait ajouter un étudiant", async () => {
    mock.onPost("http://127.0.0.1:8000/api/etudiants/").reply(201, { ...mockEtudiants[0], id: 3 });


    render(<Etudiants />);

    await waitFor(() => screen.getByText("Liste des Étudiants"));

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/Nom:/), { target: { value: "Lemoine" } });
    fireEvent.change(screen.getByLabelText(/Prénom:/), { target: { value: "Marie" } });
    fireEvent.change(screen.getByLabelText(/Email:/), { target: { value: "marie.lemoine@example.com" } });
    fireEvent.change(screen.getByLabelText(/Téléphone:/), { target: { value: "1122334455" } });
    fireEvent.change(screen.getByLabelText(/Date de naissance:/), { target: { value: "1999-03-03" } });
    fireEvent.change(screen.getByLabelText(/Classe:/), { target: { value: "1" } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText("Ajouter"));

    // Attendre que le nouvel étudiant soit ajouté à la liste
    await waitFor(() => screen.getByText("Lemoine Marie"));
    expect(screen.getByText("marie.lemoine@example.com")).toBeInTheDocument();
  });

  test("devrait modifier un étudiant", async () => {
    render(<Etudiants />);

    await waitFor(() => screen.getByText("Liste des Étudiants"));

    // Cliquer sur le bouton Modifier
    fireEvent.click(screen.getAllByText("Modifier")[0]);

    // Vérifier que les données actuelles sont chargées dans le formulaire
    const nomInput = screen.getByLabelText(/Nom:/) as HTMLInputElement;
    expect(nomInput.value).toBe("Dupont");

    // Modifier le nom et soumettre
    fireEvent.change(screen.getByLabelText(/Nom:/), { target: { value: "Lemoine" } });
    fireEvent.click(screen.getByText("Modifier"));

    // Attendre que la liste des étudiants soit mise à jour
    await waitFor(() => screen.getByText("Lemoine Jean"));
  });

  test("devrait supprimer un étudiant", async () => {
    mock.onDelete("http://127.0.0.1:8000/api/etudiants/1/").reply(200);

    render(<Etudiants />);

    await waitFor(() => screen.getByText("Liste des Étudiants"));

    // Cliquer sur le bouton Supprimer
    fireEvent.click(screen.getAllByText("Supprimer")[0]);

    // Attendre que l'étudiant soit supprimé de la liste
    await waitFor(() => expect(screen.queryByText("Dupont Jean")).not.toBeInTheDocument());
  });

  test("devrait afficher un message d'erreur si l'API échoue", async () => {
    mock.onGet("http://127.0.0.1:8000/api/etudiants/").reply(500);

    render(<Etudiants />);

    await waitFor(() => screen.getByText("Erreur lors du chargement des étudiants"));
    expect(screen.getByText("Erreur lors du chargement des étudiants")).toBeInTheDocument();
  });
});
