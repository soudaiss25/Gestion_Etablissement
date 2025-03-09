import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import Professeur from "./professeurs"; // Assure-toi que le chemin est correct

describe("Professeur Component", () => {
  test("affiche correctement le titre", () => {
    render(<Professeur />);
    expect(screen.getByText("Page Professeur")).toBeInTheDocument();
  });

  test("test du formulaire d'ajout de professeur", () => {
    render(<Professeur />);
    
    // Simule la saisie des données dans le formulaire
    fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: "Jean" } });
    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: "Dupont" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "jean.dupont@example.com" } });
    fireEvent.change(screen.getByLabelText(/Spécialité/i), { target: { value: "Mathématiques" } });

    // Vérifie que les valeurs ont bien été mises à jour
    expect(screen.getByLabelText(/Prénom/i)).toHaveValue("Jean");
    expect(screen.getByLabelText(/Nom/i)).toHaveValue("Dupont");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("jean.dupont@example.com");
    expect(screen.getByLabelText(/Spécialité/i)).toHaveValue("Mathématiques");
  });

  test("bouton d'ajout de professeur", () => {
    render(<Professeur />);
    const boutonAjouter = screen.getByRole("button", { name: /Ajouter Professeur/i });
    expect(boutonAjouter).toBeInTheDocument();
  });
});
