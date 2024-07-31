# Zod and Zodios Workshop


## Setup

- Clone the repository and open three terminals in your editor.
    - In the first terminal, run:
        ```bash
        cd backend
        npm i
        npx prisma migrate dev --name init
        npx prisma db seed
        npm run dev
        ```

    - In the second terminal, run:
        ```bash
        cd frontend
        npm i
        npm run dev
        ```

    - In the third terminal, run:
        ```bash
        git checkout -b lecture
        cd frontend
        npm run sync
        ```

- You can run `npm run sync` in the third terminal anytime, this will update your local code to match the last commit of code we work on together.
- Below are notes and documentation for the backend endpoints we will use.


## Notes

> These notes are full of links to documentation and other resources. There are also labels formatted like `EXAMPLE [x.x.x]`, which connect the bullet point label to a comment in the codebase. To find the spot in the codebase that corresponds to that step, search for the label in your editor.

1. [Zod](https://zod.dev/)
    1. What is Zod?
        1. Zod is a validation library. It allows you to define a "schema", which describes the shape and types of an object or variable
        2. A type can be derived from the schema and used in Typescript code, and objects can be validated and parsed on the schema at runtime, ensuring they conform to the expected types and structure.
        3. It's particularly useful when your data comes from a source where the natural type of your data would be `unknown` or `any`, like a database or API call, or when there may be missing properties, such as in forms filled out by users. It's useful both server and client-side.
        4. Zod is also used by many other Typescript-first libraries (TRPC, React Hook Form, etc), which require you to write zod schemas to use the library at all.
    2. Zod example code
        1. Schema and inferred type - `EXAMPLE [1.ii.a]`
        2. Backend - request body validation - `EXAMPLE [1.ii.b]`
        3. Frontend - Form validation (example [in this post](https://stackademic.com/blog/form-validation-with-zod) but it's probably better to use a form library)
2. [Zodios](https://www.zodios.org/docs/intro)
    1. Zodios is an Axios wrapper that uses Zod and lets you make *type-safe* REST requests.
        1. You define endpoints with provided functions and classes, describing their methods, paths, parameters (body/queries/header/path params), responses, and errors with Zod schemas.
        2. Endpoint definitions are composed into an API definition, which is used to create a Zod client instance. (There's also a way to share the API definition across front and back end, but I've only used it for calling third-party or non JS/TS servers.)
        3. The Zod client instance allows you to make REST calls on your defined endpoints, showing type errors if you put the wrong shape in, and returning automatically type-hinted response data.
    2. Create a Zodios client
        1. Write some zodios endpoints from this repo's backend
            1. `GET /api/workouts` - `EXAMPLE [2.ii.a.a] - getWorkouts`
            2. `POST /api/workouts` - `EXAMPLE [2.ii.a.b] - createWorkout`
            3. `POST /api/users` - `EXAMPLE [2.ii.a.c] - createUser`
        2. Create a Zodios API definition and client instance `EXAMPLE [2.ii.b]`
            1. are extra properties stripped? Are bodies and responses typed? What about empty responses?
    3. Call endpoints and [handle errors in Zodios](https://www.zodios.org/docs/client/error) - `EXAMPLE [2.iii]`
        1. isErrorFromAlias
        2. Are errors actually validated with schema?
    4. [Zodios plugins](https://www.zodios.org/docs/client/plugins)
        1. `@zodios/plugins` has some plugins you can use, two are for different body formats
            1. FormURLPlugin - `application/x-www-form-urlencoded` format body
            2. FormDataPlugin - `multipart/form-data` format body
        2. Write our own logger plugin - `EXAMPLE [2.iv.b]`
3. Try it on your own
    1. Go back to an older project where this would have been useful, either your own backend or a third-party, and try refactoring the frontend with Zodios.
    2. Third-party backends you could try defining and calling
        1. [Emoji Hub](https://github.com/cheatsnake/emojihub)
        2. [Art Institute of Chicago](https://api.artic.edu/docs/#quick-start)
        3. [Open Library](https://openlibrary.org/dev/docs/api/search)
4. Other stuff to try on your own later
    1. [Zodios on the backend](https://www.zodios.org/docs/category/zodios-server)
    2. [React-query based hooks](https://www.zodios.org/docs/client/react)
    3. [Zod refinements](https://zod.dev/?id=refine)
    4. Basic authorization plugin (I can show you an example where I had to build this for Spotify's API)


# Backend API Endpoints

## Health

`GET /`

### Success Response

**Code** : `200 OK`

**Content example**
```
Ok!
```

## Create user

`POST /api/users`

**Data constraints**

```json
{
    "password": "[8 chars min, with at least one uppercase, lowercase, number, and symbol]"
}
```

**Example body**

```json
{
    "username": "charlie",
    "email": "charlie@example.com",
    "password": "Charlie3@"
}
```

### Success Response

**Code** : `201 CREATED`

**Content example**
```json
{
    "id": 4,
    "email": "charlie@example.com",
    "username": "charlie",
    "createdAt": "2024-07-31T07:08:54.408Z"
}
```

### Error Response

**Conditions**
- Missing field
- Empty string field
- Username or email that already exists in database
- Invalid email address
- Password does not satisfy a constraint

**Code** : `400 BAD REQUEST`

**Content example**
```json
{
    "message": "Email already has an account or username already in use"
}
```

## Get workouts

`GET /api/workouts`

### Success Response

**Code** : `200 OK`

**Content example**
```json
[
    {
        "id": 1,
        "username": "test",
        "type": "run",
        "duration": 34,
        "notes": null,
        "loggedAt": "2024-07-31T05:14:59.705Z"
    },
    {
        "id": 2,
        "username": "pizzabob",
        "type": "swim",
        "duration": 27,
        "notes": null,
        "loggedAt": "2024-07-31T05:14:59.705Z"
    },
]
```

## Create workout

`POST /api/workouts`

**Data constraints**

```json
{
    "type": "[ 'run' | 'swim' | 'bike' ]",
    "username": "[must exist in database]",
    "duration": "[positive integer]"
}
```

**Example body**

```json
{
    "username": "charlie",
    "duration": 25,
    "type": "run",
    "notes": ""        // Optional field
}
```

### Success Response

**Code** : `201 CREATED`

**Content example**
```json
{
    "id": 4,
    "username": "charlie",
    "type": "run",
    "duration": 25,
    "notes": "",
    "loggedAt": "2024-07-31T07:24:03.809Z"
}
```

### Error Response

**Conditions**
- Missing field other than `notes`
- Username that does not exist in database
- Invalid workout type
- Duration is <= 0 or is non-integer

**Code** : `400 BAD REQUEST`

**Content example**
```json
{
    "message": "Number must be greater than 0"
}
```
