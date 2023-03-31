.PHONY: start stop build api-shell migrations lint test

start:
	docker compose up

stop:
	docker compose down --remove-orphans

build:
	docker compose build --pull --no-cache

api-shell:
	docker compose exec api bash

migrations:
	docker compose exec -T api npm run typeorm:run-migrations

lint:
	docker compose exec -w /usr/src/app api npm run lint

test:
	docker compose exec -w /usr/src/app api npm run test