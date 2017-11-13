# Notification


## Features
* Universal rendering, with async data support with [nextjs](https://zeit.co/blog/next4)
* pages and APIs hosted Express server
* Signup / Login / Logout / [Push Notification](https://docs.pushbullet.com/#create-push) support
* Unit test with Jest / snapshots for [pages](https://github.com/a830312/notification/tree/master/pages/__tests__) and [data](https://github.com/a830312/notification/tree/master/data/__tests__)



## How to use

Install it and run:


`git clone git@github.com:a830312/notification.git`

```bash

npm install

npm run dev

```

## Stacks
* nextjs
* react
* redux
* Babel@6
* npm as package manager


## Pages
[pages/](https://github.com/a830312/notification/tree/master/pages)
* [/](https://github.com/a830312/notification/blob/master/pages/index.js) - signup or login
* [/pushes](https://github.com/a830312/notification/blob/master/pages/pushes.js) - send notification to current user
* [/users](https://github.com/a830312/notification/blob/master/pages/users.js) - list all registered users

## APIs
[config/api.js](https://github.com/a830312/notification/blob/master/config/api.js)
* [Retrieve a list of all registered users](https://github.com/a830312/notification/blob/master/README.md#list-users)
* [Signup](https://github.com/a830312/notification/blob/master/README.md#signup)
* [Login](https://github.com/a830312/notification/blob/master/README.md#login)
* [Logout](https://github.com/a830312/notification/blob/master/README.md#logout)
* [Push and update user](https://github.com/a830312/notification/blob/master/README.md#send-a-notification-to-current-user-and-also-increment-that-users-numofnotificationspushed-by-1)

testing data example:
Preparation
Visit https://www.pushbullet.com/
* Sign up
* Go to Devices
	* Install Pushbullet to a device of your choice (be it a phone or a web browser)
* Go to Settings, Account
	* Select Create Access Token
	* Store the generated access token somewhere safe
```
{
	"username": "bbcUser1",
	"accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}
```

### Retrieve a list of all registered users

`HTTP`
```
GET /list-users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
```

`cURL`
```
curl -X GET \
  http://localhost:3000/list-users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

`Response` with `status 200`

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


### Signup

`HTTP`
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
```

`cURL`
```
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

`Response` with `status 200`
```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 0
}
```

`Response` with `status 400`

```
Bad Request
```


### Login

`HTTP`
```
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache

{
    "username": "bbcUser2",
    "accesstoken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS"
}
```

`cURL`
```
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

`Response` with `status 400`
```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 0
}
```

`Response` with `status 400`

```
Unauthorize
```


### Logout
```
GET /logout HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache

curl -X GET \
  https://localhost:3000/logout \
  -H 'cache-control: no-cache' \

```

### Send a notification to current user and also increment that user’s 'numOfNotificationsPushed' by 1

`HTTP`
```
POST /pushes HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: a73e40b7-353a-bac7-9c4e-1802c1fa6c42

{
	"username": "bbcUser1"
}
```

`cURL`
```
curl -X POST \
  http://localhost:3000/pushes \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"username": "bbcUser1"
}'

```

`Response` with `status 200`
```
{
    "username": "bbcUser2",
    "accessToken": "o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS",
    "creationTime": "2017-11-12T19:30:01",
    "numOfNotificationsPushed": 1
}
```

`Response` with `status 403`
```
{
    "error": {
        "message": "Forbidden: no match user found",
        "status": 403
    }
}
```

## Unit test

`npm run test`


## Deploy to Heroku

Set `HOST` to heroku config var. (without trailing slash e.g.: https://test-app.herokuapp.com)


