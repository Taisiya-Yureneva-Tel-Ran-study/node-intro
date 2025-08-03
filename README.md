# Node.js intro

## HW #7 backend

### Express middleware
#### Protocol
- POST api/greet 
    - returns JSON with a greeting and request time
    - does not allow more than 3 requests per minute
- GET api/status
    - returns JSON with server status and request time
    - allows as many requests as needed