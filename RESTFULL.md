# RESTFULL

## PATHS

#### Collection
Format: /{name_resource}s
Examples:
- /users
- /articles

#### Item
Format: /{name_resource}s/{id_resource}
Examples:
- /users/150
- /articles/server-components

#### SubCollection
Format: /{name_resource}s/{id_resource}/{name_resource2}s
Examples:
- /users/150/comments

#### Action
Format: /{action_verb}
Examples:
- /login


## Verbs

#### GET
Récupération de données
- /{name_resource}s = tableau de données
- /{name_resource}s/{id_resource} = objet représentant la donnée

#### POST
Création de données
- /{name_resource}s = objet représentant la donnée créée   
  
Effectuer une action
- /{name_resource}s/{action_verb}
- /{name_resource}s/{id_resource}/{action_verb}

#### PUT/PATCH
Remplacer (PUT) ou modifier (PUT/PATCH) une donnée
- /{name_resource}s/{id_resource} = objet représentant la donnée modifiée   

#### DELETE
Supression de la donnée
- /{name_resource}s/{id_resource} = rien

## HTTP Code

#### GET collection
200 : toujours

#### GET item
200 : si item existe
404 : si item n'existe pas

#### POST collection
201 : si item créé
400 : si requête dé-sérialisable
422 : Champs non valide

#### PUT item
200 : si item remplacé
201 : si item créé
400 : si requête dé-sérialisable
422 : Champs non valide

#### PATCH item
200 : si item modifié
400 : si requête dé-sérialisable
404 : si item n'existe pas
422 : Champs non valide

#### DELETE item
204 : si item supprimé
404 : si item n'existe pas