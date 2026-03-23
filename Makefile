REGISTRY   := cr.yandex
REGISTRY_ID := crpr6qnoclmm7d11fktc
IMAGE_NAME  := bathhub
TAG        ?= latest

FULL_IMAGE  := $(REGISTRY)/$(REGISTRY_ID)/$(IMAGE_NAME):$(TAG)

.PHONY: login build push deploy all

## Authenticate Docker with Yandex Container Registry using IAM token
login:
	yc container registry configure-docker

## Build the production Docker image
build:
	docker build -t $(FULL_IMAGE) .

## Push the image to Yandex Container Registry
push:
	docker push $(FULL_IMAGE)

## Build + push in one step
release: build push
	@echo ""
	@echo "✓ Published: $(FULL_IMAGE)"

## Deploy a new revision to Yandex Serverless Container (run after release)
deploy:
	yc serverless container revision deploy \
	  --container-name santehnika \
	  --image $(FULL_IMAGE) \
	  --cores 1 \
	  --memory 256MB \
	  --concurrency 4 \
	  --execution-timeout 15s \
	  --service-account-id $(shell yc iam service-account list --format json | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');console.log(JSON.parse(d)[0].id)")
	@echo ""
	@echo "✓ Deployed: $(FULL_IMAGE)"

## Full pipeline: build, push, deploy, clean old images
ship: release deploy clean

## Delete all untagged / old images from the registry (keep only :latest)
clean:
	@echo "Cleaning old images from registry..."
	@yc container image list --registry-id $(REGISTRY_ID) --format json | \
	  node -e " \
	    const imgs = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); \
	    const old = imgs.filter(i => !i.tags || i.tags.length === 0 || !i.tags.includes('latest')); \
	    old.forEach(i => { process.stdout.write(i.id + '\n'); }); \
	  " | xargs -r -I{} sh -c 'echo "  deleting {}" && yc container image delete --id {} --async'
	@echo "✓ Registry cleaned"

## Build, push, then list recent images in the registry
all: release
	yc container image list --registry-id $(REGISTRY_ID) --limit 5

## Print the image URL (useful for Yandex Serverless Container config)
url:
	@echo $(FULL_IMAGE)
