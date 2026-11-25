#!/bin/bash
# aller dans la racine
cd "$(dirname "$0")/..
" || exit 1
# pull sur main
git pull origin main
# refait l'image
docker build -t projet-final .
# supprime l'ancien conteneur, sans pb s'il n'existe pas
docker rm -f site 2>/dev/null || true
# lance un nouveau conteneur sur le port 8081
docker run -d --name site -p 8081:80 projet-final
# laisse 2 secondes au conteneur de se lancer
sleep 2
# verifie si le site répond et affiche succès ou échec avec code d'erreur 1
if curl -fsS http://localhost:8081 >/dev/null; then
echo "Déploiement réussi"
else
echo "Échec du déploiement : le site ne répond pas sur le port 8081"
exit 1
fi