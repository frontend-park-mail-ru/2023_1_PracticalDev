.PHONY: all run run-sudo mock mock-down

all: run

run: build-docker
	docker run -it --rm\
		-v $(PWD):/home/code/ \
		--user $$(id -u):$$(id -g) \
		-p 8000:8000 \
	  node_app

run-sudo: build-docker
	docker run -it --rm\
		-v $(PWD):/home/code/ \
		-p 8000:8000 \
		-p 8080:8080 \
	  node_app

build-docker: Dockerfile
	DOCKER_BUILDKIT=1 docker build . -f Dockerfile -t node_app 
	touch $@

dev:
	docker compose -f ./docker-compose.yml up -d --build

dev-down:
	docker compose -f ./docker-compose.yml down

mock:
	docker compose -f ./mock/docker-compose.dev.yml up -d --build

mock-down:
	docker compose -f ./mock/docker-compose.dev.yml down

.PHONY: deploy
deploy: 
	cp docker-compose.yml docker-compose.yml.old && cp prod/docker-compose.yml docker-compose.yml
	docker compose -f docker-compose.yml up -d --build
	cp docker-compose.yml.old docker-compose.yml && rm docker-compose.yml.old
