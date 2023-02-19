.PHONY: all run run-sudo

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
	  node_app

build-docker: Dockerfile
	docker build . -f Dockerfile -t node_app 
	touch $@
