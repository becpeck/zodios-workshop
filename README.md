# Zod and Zodios Workshop

1. Zod
    1. What is Zod? Why use it? What can you use it for?
    2. Zod example code
        1. Schema
        2. Derived type
        3. Form validation
2. Zodios
    1. Zodios is an Axios wrapper that uses Zod to validate HTTP request bodies, responses, and errors.
    2. Why use it? Your requests will have type errors if you try calling the endpoints with the wrong shape, and your responses will automatically have type hints. It's great DX!
    3. Zodios example code
        1. Type a get request
        2. Type a post/put request - are extra properties stripped? Are bodies and responses typed? What about empty responses?
        3. Try it out
    4. Zodios plugins
        1. FormURLPlugin - `application/x-www-form-urlencoded` format body
        2. FormDataPlugin - `multipart/form-data` format body
        3. Write our own logger plugin
    5. Zodios error handling
        1. isErrorFromAlias
        2. Are errors actually validated with schema?
3. Try it on your own
    1. Come up with a backend repo with example endpoints
    2. List of public repos that don't require auth/tokens?
4. Other stuff to try on your own later
    1. Basic authorization plugin
    2. React-query based hooks
    


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
