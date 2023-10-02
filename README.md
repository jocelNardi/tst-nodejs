# Mini-project "Pointage":

## Author

👤 **Nardi Jocel RAMINOSOA**

> this application using Node, typescript, PostgreSQL, Prisma, Docker, Jest

## Installation

Run application:

```sh
Docker-compose up
```

Test unitaire without docker:

> change host database from env file :

```
host : postgres to localhost
```

```
port : 5432 to 54366
```

> Run test

```sh
yarn && yarn test
```

## List utilisateurs/mot de passe dans l'app:

- Admin (123456789)

## Utilisation Endpoint

> Cet endpoint Permet a l'utilisateur de se connecter avant de voirs les listes des employés

```http
POST /api/admin/login
```

> Cet endpont permet de récupérer la liste des employes enregistrés dans le système.

```http
GET /api/employee
```

> Cet endpont permet de récupérer la liste des employes enregistrés dans le système avec une date ajouter dans le parametre.

```http
GET /api/employee?date=2023-09-29
```

> Cet endpont permet de créer un nouvel employé dans le système.

````http
POST /api/employee
Content-Type: application/json

{
    "name": "Employe 1",
    "firstName": "Thomas",
    "department": "Sales"
}

> Cet endpont permet au employé de faire Checkin a l'entrer.

```http
POST /api/check/in
Content-Type: application/json

{
    "id": "1"
}

> Cet endpont permet au employé de faire Checkout au sortie.
```http
PUT /api/check/out
Content-Type: application/json

{
    "id": "1"
}















## Description de l'application:

L'école ABC gère le pointage de ses employés via un fichier excel.
Format des données:

````

    IDENTIFIANT_EMPLOYEE:    14566
    CHECK-IN: 2020-09-22T10:00:00
    CHECK-OUT: 2020-09-22T18:00:00
    COMMENTAIRE: "absent entre 15h et 15h15"

```

On voudrait bien sécuriser cela via une base de données pour éviter qu'un enseignant consulte les horaires des autres;

## Tâches:

Le but va être de créer un API REST Node Js gérant ce système de pointage.
TODO:

1. créer un endpoint qui permet de créer un employée.

Les champs ci-dessous doivent être présent dans la base après la création.

```

{
"id": {STRING}
"name": {STRING}
"firstName": {STRING}
"dateCreated": {DATE}
"department": {STRING}
}

```

1. ajouter un endpoint pour
   - récupérer la liste des employées
   - et ajouter un filtre pour les récupérer date de création ( e.g: "2021-01-05" )
2. Check-in / Check-out:
   Quand un employée fait un check-in ou checkout, on a besoin de prendre la date actuelle et la sauvegarder dans la BDD.

- ajouter un endpoint /check-in et un autre pour le /check-out
  - paramètres: employeeId, comment

4. (optionel-bonus):
   Quand un employée fait un checkout, on devrait calculer le temps entre le check-in et checkout et le stocker en BDD.

Les données doivent être stockés en BDD ( libre à vous de définir la techno )

- Ces implémentations doivent être documentés;

## Point bonus:

- Documentation
- tests unitaires / intégrations
- Docker/Makefile
```
