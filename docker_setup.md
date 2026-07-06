# Docker setup (development)

Runs the full stack — MongoDB, the Express backend, and the CRA frontend — with hot
reload. Source is bind-mounted, so edits on the host reload inside the containers.
Mongo runs in Docker with a persistent volume and is **auto-seeded with the admin user**
on first run, so a fresh machine (Mac or Linux) works with no manual database steps.

## Services

| Service  | Image / build | Host port | Notes                                          |
|----------|---------------|-----------|------------------------------------------------|
| mongo    | `mongo:8`     | 27017     | Data in the `mongo-data` volume; seeded on init|
| backend  | `./backend`   | 8000      | Express + nodemon, DB `ecom-uri`               |
| frontend | `./frontend`  | 3000      | CRA dev server, calls the backend on `:8000`   |

## Prerequisites (per machine — these are NOT in git)

Two secret files must exist locally on every machine (they are gitignored):

1. **`backend/.env`** — copy from `backend/.env.example`. `DATABASE` is ignored under
   Docker (Compose points at the mongo service), but `CLOUDINARY_*` must be real for
   image upload to work.

2. **`backend/config/fbServiceAccountKey.json`** — your Firebase Admin service account
   key. Required by `backend/firebase/index.js` at startup; without it the backend exits
   with `Cannot find module '../config/fbServiceAccountKey.json'`. Download it from the
   Firebase console (Project settings -> Service accounts -> Generate new private key).

## Run

```sh
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:8000/api

On first boot Mongo runs `mongo-seed/01-init-admin.js`, which inserts the admin user
`urisham@gmail.com` into `ecom-uri`. Log in with that account (via Firebase) to get the
admin dashboard, create/list/delete products, and image upload.

Stop with `docker compose down`. Add `-v` to also drop the Mongo volume (next `up` re-seeds).

## Notes

- **Seed runs only on an empty volume.** If the admin user ever goes missing, reset with
  `docker compose down -v && docker compose up` (this wipes local product data too).
- File watching uses polling (`CHOKIDAR_USEPOLLING` / nodemon `-L`) because Docker bind
  mounts on macOS do not propagate inotify events. Harmless on Linux.
- `node_modules` lives in an anonymous volume per service, so the host's macOS-built
  modules never shadow the container's Linux ones. After changing dependencies:
  `docker compose build backend` (or `frontend`), then `docker compose up`.
- **Product data is per-machine.** Each machine's Docker volume is separate, so products
  added on the Mac do NOT appear on the Linux laptop automatically. For a single database
  shared live across machines, move to a cloud DB (MongoDB Atlas): set `DATABASE` in
  `backend/.env` to the Atlas URI and remove the `mongo` service from `docker-compose.yml`.
