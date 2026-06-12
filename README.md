# Cinoche

<https://cinoche.github.io>

Lanceur de divertissement pour le navigateur des véhicules Tesla — une grille de services de streaming, télé, sports et outils pertinents au Québec, avec recherche, catégories et interface bilingue (FR/EN).

Entertainment launcher for the Tesla in-car browser — a grid of streaming, TV, sports and tool services relevant to Québec, with search, categories and a bilingual (FR/EN) interface.

## Fonctionnalités / Features

* Grille de tuiles tactiles par catégorie (Streaming, Télé, Sports, Outils) avec recherche instantanée
* Bascule de langue FR/EN mémorisée
* PWA : l'application se charge instantanément même avec une connexion faible
* Invite plein écran spécifique Tesla (redirection YouTube pour passer en mode théâtre)
* Lanceur d'adresse web, avec lien profond : `https://cinoche.github.io/?url=http://some.url.com`

## Développement / Development

Stack : [Vite](https://vite.dev) + [Svelte 5](https://svelte.dev) + TypeScript + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

```bash
npm install
npm run dev      # serveur de développement
npm run check    # svelte-check + tsc
npm run build    # build de production dans dist/
npm run preview  # sert le build de production
```

Le déploiement vers GitHub Pages est automatique à chaque push sur `main` (voir `.github/workflows/deploy.yml`).

Les services sont définis dans `src/lib/data/services.ts` — ajouter une entrée et son logo dans `public/logos/` suffit pour ajouter une tuile.
