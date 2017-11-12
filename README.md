# Notification

## How to use

Install it and run:

```bash
npm install
npm run dev
```

## apis
config/api.js

* Retrieve a list of all registered users

```
GET /list-users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache

curl -X GET \
  http://localhost:3000/list-users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

`Response`

```
[
    {
        "username": "bbcUser2",
        "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
        "creationTime": "2017-11-12T20:04:42",
        "numOfNotificationsPushed": 0
    }
]
```

* Signup

```
POST /signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: */*
Cache-Control: no-cache

{
    "username": "bbcUser2",
    "accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}

curl -X POST \
  http://localhost:3000/signup \
  -H 'accept: */*' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
"username": "bbcUser2",
"accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}'

```

`Response`

```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 0
}
```

* Login

```
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache

{
    "username": "bbcUser2",
    "accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}

curl -X POST \
  http://localhost:3000/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: ef7367f6-b890-ed67-47fc-ec9f49f20437' \
  -d '{
"username": "bbcUser2",
"accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}'

```

`Response`

```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 0
}
```
* Logout

```
GET /logout HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache

curl -X GET \
  https://localhost:3000/logout \
  -H 'cache-control: no-cache' \

```

* Send a notification to current user and also increment that user’s `numOfNotificationsPushed` by 1

```
POST /pushes HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: a73e40b7-353a-bac7-9c4e-1802c1fa6c42

{
	"username": "bbcUser1"
}

curl -X POST \
  http://localhost:3000/pushes \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"username": "bbcUser1"
}'

```

`Response`

```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 1
}
```
