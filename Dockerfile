# Part de l'image officielle nginx, version légère
FROM php:8.4-apache
# Copie les fichiers du site dans le dossier publié par nginx
COPY /site /usr/share/nginx/html/
# Indique que le conteneur écoute sur le port 80
EXPOSE 80

##j'ai juste recopié le dockerfile du tp3 en l'adaptant à ce site