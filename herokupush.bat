git branch -m "main" "placeholder"
git branch -m "herokuapp" "main"
git push heroku main
git branch -m "main" "herokuapp"
git branch -m "placeholder" "main"
pause
