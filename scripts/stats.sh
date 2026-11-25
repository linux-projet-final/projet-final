#!/bin/bash
# Utilise le premier argument comme nom de conteneur, ou "site" par défaut
CONTENEUR=
"${1:-site}"
# Vérifie que le conteneur existe ; sinon affiche une erreur et quitte avec le code 1
if ! docker inspect "$CONTENEUR" >/dev/null 2>&1; then
echo "Erreur : le conteneur '$CONTENEUR' n'existe pas.
"
exit 1
fi
# Récupère uniquement les journaux d'accès (stdout) en écartant les messages Apache
(stderr)
LOGS=$(docker logs "$CONTENEUR" 2>/dev/null)
# Vérifie si le journal est vide (aucune visite enregistrée)
if [ -z "$LOGS" ]; then
echo "Aucune visite enregistrée pour le conteneur '$CONTENEUR'
exit 1
.
"
fi
# Compte le nombre total de lignes de requêtes reçues
NB
_
REQ=$(echo "$LOGS" | wc -l)
# Filtre les lignes ayant le code statut 404 (champ 9) et compte leur nombre
NB
_
404=$(echo "$LOGS" | cut -d' '
-f9 | grep -c "^404$")
# Extrait les IP (champ 1), trie, compte les occurrences, trie par fréquence et garde la
première
TOP
_
IP=$(echo "$LOGS" | cut -d' '
'{print $2}')
-f1 | sort | uniq -c | sort -rn | head -n 1 | awk
# Extrait les pages (champ 7), trie, compte les occurrences, trie par fréquence et garde
la première
TOP
_
PAGE=$(echo "$LOGS" | cut -d' '
'{print $2}')
-f7 | sort | uniq -c | sort -rn | head -n 1 | awk
# Affiche les quatre indicateurs formatés
echo "Requêtes : $NB
REQ"
_
echo "Erreurs 404 : $NB
404"
_
echo "IP la plus active : $TOP
IP"
_
echo "Page la plus demandée : $TOP
PAGE"