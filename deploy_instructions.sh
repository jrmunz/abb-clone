#! /bin/bash

# If you are going not going to deploy with heroku use the code below and run in on the terminal
# docker buildx build --platform linux/amd64 -t dolosolow/abb:1.0.0 .
# docker push dolosolow/abb:1.0.0

# -- FOR HEROKU DOCKER IMAGE DEPLOYMENT (uncomment lines below) --
# Replace <name> for the app name assigned after the heroku app is created using 'heroku create'
# docker tag dolosolow/abb:1.0.0 registry.heroku.com/<name>/web
# docker push registry.heroku.com/<name>/web
# heroku container:release web -a <name>