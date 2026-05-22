# Suivi TRS — SOFRENOR

Application web locale pour le suivi du TRS d'une ligne de production.

## Lancer le projet

1. Ouvrir `index.html` dans un navigateur.
2. Utiliser un compte de démonstration :
   - `production@sofrenor.ma` / `sofrenor123`
   - `maintenance@sofrenor.ma` / `sofrenor123`
3. Ou créer un compte opérateur.
4. Pour une vérification rapide, se connecter avec un compte responsable, ouvrir `Paramètres`, puis cliquer sur `Charger des données démo`.

## Fonctionnalites

- Connexion / création de compte avec rôles.
- Saisie opérateur des données de poste.
- Calcul automatique du TRS, disponibilité, performance et qualité.
- Tableau de bord avec criticité des machines, Pareto des arrêts (fréquence) et évolution du TRS.
- Historique des saisies.
- Paramètres administrateur pour ajuster les cadences nominales.
- Chargement de données de démonstration.
- Export CSV de l'historique.

## Stockage

Les données sont conservées dans le `localStorage` du navigateur pour une démonstration sans base de données.

## Logo

Le site charge `assets/sofrenor-logo.png` (avec fallback sur `assets/sofrenor-logo.svg`).

Pour importer rapidement le logo depuis le presse-papiers : `tools/save-logo-from-clipboard.ps1`.

## Verification

Voir aussi `GUIDE-VERIFICATION.md`.
