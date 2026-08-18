# Xinran Zhang - Academic Homepage

This site uses [al-folio](https://github.com/alshedivat/al-folio) v0.16.3 and is deployed with GitHub Actions.

## Local preview

Start Docker Desktop, open this repository in VS Code, and run:

```powershell
docker compose pull
docker compose up -d
```

Open <http://localhost:8080/>. Jekyll watches the source files and rebuilds the site after edits.

Useful commands:

```powershell
docker compose logs -f
docker compose restart
docker compose down
```

## GitHub Pages deployment

The `Deploy site` workflow builds the source from `main` and writes the generated website to `gh-pages`.

In the GitHub repository, configure:

1. `Settings > Actions > General > Workflow permissions`: select `Read and write permissions`.
2. `Settings > Pages > Build and deployment > Source`: select `Deploy from a branch`.
3. Select the `gh-pages` branch and the `/(root)` folder, then save.

Do not edit the generated `gh-pages` branch directly.
