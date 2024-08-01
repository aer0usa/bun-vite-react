#!/bin/bash

podman run \
    --network host \
    --interactive \
    --tty \
    --rm \
    -v $(pwd):/app/:Z \
    -w /app \
    oven/bun run dev
