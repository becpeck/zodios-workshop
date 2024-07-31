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
    "message": "Prisma Error"
}
```
