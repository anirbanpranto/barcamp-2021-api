branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ "$1" == "-wh" ]; 
then
  git add .
  git commit -m "$2"

  echo ===================================================
  echo Pushing to github branch $branch ...
  echo ===================================================
  git push origin ${branch}

  echo ===================================================
  echo Pushing to heroku branch $branch ...
  echo ===================================================
  git push heroku ${branch}:master
else
  git add .
  git commit -m "$1"

  echo ===================================================
  echo Pushing to github branch $branch ...
  echo ===================================================
  git push origin ${branch}
fi