# Notes

> notes taken during the course

<!-- https://gitignore.io -->
<!-- https://github.com/github/gitignore -->

## CLASS-1

https://github.com/rocketseat-education/nlw-06-reactjs/tree/aula01

Component | Property | State

```sh
yarn create react-app letmeask --template typescript
yarn start

yarn add firebase
```

## CLASS-2

```sh
yarn add node-sass@^5.0.0
```

https://fonts.google.com/specimen/Roboto?query=roboto

https://fonts.google.com/specimen/Poppins?query=poppins

```sh
yarn add react-router-dom
yarn add @types/react-router-dom -D
```

## CLASS-3

https://firebase.google.com/docs/database/rtdb-vs-firestore

Firebase rules

```json
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.uid)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)"
          }
        }
      }
    }
  }
}
```

Toast instead alert
https://react-hot-toast.com/

https://firebase.google.com/docs/database/admin/retrieve-data#child-added

## CLASS-4

Dynamic title
https://www.npmjs.com/package/react-helmet

Firebase Open source alternative
https://supabase.io/

http://localhost:3000/rooms/-MdEj9h6DkswZ3AP8D_J

http://localhost:3000/admin/rooms/-MdEj9h6DkswZ3AP8D_J

https://github.com/reactjs/react-modal

## CLASS-5

```sh
yarn add react-modal
yarn add @types/react-modal -D
```

https://react-hook-form.com/

```sh
yarn add react-hook-form
yarn add @hookform/resolvers -D
yarn add yup
```

https://www.npmjs.com/package/classnames

```sh
yarn add classnames
```

Host in firebase
https://create-react-app.dev/docs/deployment/#firebase

```sh
npm install -g firebase-tools # OR yarn global add firebase-tools
firebase login
firebase init

yarn build

firebase deploy
```
