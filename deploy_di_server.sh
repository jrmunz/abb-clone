#! /bin/bash
yarn build:server
docker buildx build --platform linux/amd64 -t dolosolow/abb:1000 .
docker push dolosolow/abb:1000
docker tag dolosolow/abb:1000 registry.heroku.com/mysterious-tor-70073/web
docker push registry.heroku.com/mysterious-tor-70073/web
heroku container:release web -a mysterious-tor-70073