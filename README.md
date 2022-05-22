# YFC-project
👋 youth for causes project 👋
Will be using flask for online integration, but basic local functionality done already.
> non-minified css available at `src/output.css`

website at: https://youthforcauses2022.herokuapp.com/home.html

# TODO LIST 😞
* remove placeholders and put in actual images
* carousell fade out, fix for spammers

## 🖨️ Requirements:
**Node.js packages:** postcss-import, autoprefixer and tailwindcss _(see **for npm libraries** section)_

*To install (note: no need yet)*
```
pip install -r requirements.txt
```

*for npm libraries:*
```
npm install -D postcss-import
npm install -D autoprefixer
npm install tailwindcss
```

*to compile ./src/input.css:*
```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
