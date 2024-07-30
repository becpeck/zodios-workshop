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
