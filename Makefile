start:
	docker compose up

stop:
	docker compose down --remove-orphans

build:
	docker compose build --pull --no-cache

shell:
	docker compose exec api bash

migrations:
	docker compose exec -T api npm run typeorm:run-migrations