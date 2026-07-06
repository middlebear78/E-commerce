# Docker setup (development)

Runs the full stack — MongoDB, the Express backend, and the CRA frontend — with hot
reload. Source is bind-mounted, so edits on the host reload inside the containers.

## Services

| Service  | Image / build     | Host port | Notes                                        |
|----------|-------------------|-----------|----------------------------------------------|
| mongo    | `mongo:7`         | 27017     | Data persisted in the `mongo-data` volume    |
| backend  | `./backend`       | 8000      | Express + nodemon, connects to `mongo`       |
| frontend | `./frontend`      | 3000      | CRA dev server, calls the backend on `:8000` |

## Prerequisites (one time)

1. **Backend env** — create `backend/.env` (copy from `backend/.env.example`). The
   `DATABASE` value is ignored under Docker (Compose points the backend at the local
   mongo container), but `CLOUDINARY_*` must be real for image upload to work.

2. **Firebase Admin key** — `backend/firebase/index.js` requires
   `backend/config/fbServiceAccountKey.json` at startup. Place your Firebase service
   account key there. Without it the backend container exits immediately with
   `Cannot find module '../config/fbServiceAccountKey.json'`. The file is gitignored.

3. **Frontend env** — `REACT_APP_API` is set by Compose to `http://localhost:8000/api`,
   so no `frontend/.env` is needed for Docker. (`.env.example` is provided for reference.)

## Run

```sh
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:8000/api

Stop with `Ctrl+C`, or `docker compose down`. Add `-v` to also drop the Mongo data volume.

## Notes

- File watching uses polling (`CHOKIDAR_USEPOLLING` / nodemon `-L`) because Docker bind
  mounts on macOS do not propagate inotify events.
- `node_modules` lives in an anonymous volume per service, so the host's macOS-built
  modules never shadow the container's Linux ones. After changing dependencies, rebuild:
  `docker compose build backend` (or `frontend`), then `docker compose up`.
- The backend uses the local Mongo. To point at an external DB (e.g. Atlas) instead,
  remove the `mongo` service and the `DATABASE` override in `docker-compose.yml`, and set
  `DATABASE` in `backend/.env`.
