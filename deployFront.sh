#!/bin/sh
s3Name="chillnn-cleanhack-front-nuxt"
profile="hikari_admin"

branch="dev"

deploy() {
  # deploy
  yarn abr &&
  yarn build:${branch}
  aws s3 cp --recursive ./dist/ s3://${s3Name}-${branch}/ --cache-control "max-age=3600,public,immutable" --profile ${profile} &&
  exit
}

if [ $branch = 'stg' ]; then
  deploy
elif [ $branch = 'prd' ]; then
  deploy
else
  branch="dev"
  deploy
fi
