# NODE.JS TEMPLATE

## A template that is used to setup the backend for a Node.js application.

## SETUP

Requires [Docker](https://)

Build and start the containers

```
$ docker-compose up -d

  -d, --detach    Detached mode: Run containers in the background
```

Stop/remove the containers
```
$ docker-compose stop

$ docker-compose down

  --rmi all       Remove all images used by any service
  -v, volumes     Remove named volumes declared in the 'volumes' section of the Compose file  
```

Show running containers
```
$ docker ps
```

Once a container is running, we can execute a command inside that container (e.g. view mysql database)
```
$ docker exec -it <CONTAINER ID/NAME> bin/bash
$ docker exec -it <CONTAINER ID/NAME> mysql -u "root" -p
```

---
## NOTES

Using MySQL 8.0, the following error may occur:

```
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

To fix the error, try the following:

```
  $ docker exec -it <CONTAINER ID/NAME> mysql -u "root" -p
  Enter password:
  
  mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '{your password}';
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{your password}';
  mysql> SELECT plugin FROM mysql.user WHERE User = 'root';
```
