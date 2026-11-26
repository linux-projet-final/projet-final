Installation sur un serveur neuf

si docker pas installer

sudo apt update && sudo apt install -y git curl docker.io
sudo usermod -aG docker $USER && newgrp docker


1. Cloner le dépôt
bash
mkdir -p ~/serveur
cd ~/serveur
git clone https://github.com/linux-projet-final/projet-final.git
cd projet-final
ls -l scripts/          #-rwxr-xr-x pour deploy.sh et stats.sh

Si les scripts ne sont pas exécutables : chmod +x scripts/*.sh

2. Ajouter le domaine local
bash
echo "127.0.0.1 ramenez-julien-guichon.test" | sudo tee -a /etc/hosts
3. Premier déploiement
bash
./scripts/deploy.sh

Le script récupère main, reconstruit l'image projet-final, remplace le conteneur site sur le port 8081 et vérifie avec curl que le site répond.

4. Vérifier
bash
curl http://ramenez-julien-guichon.test:8081
Ouvrir le site en local
Depuis le serveur (terminal)
bash
curl http://ramenez-julien-guichon.test:8081
# ou
curl http://localhost:8081
Depuis un navigateur
WSL : ouvrir directement http://localhost:8081 dans le navigateur Windows.
Multipass (Mac) : récupérer l'IP de la VM, puis l'ouvrir dans le navigateur :
bash
multipass info serveur | grep IPv4      # ex. 192.168.252.7

→ http://192.168.252.7:8081

Pour utiliser le nom de domaine depuis le Mac, ajouter la ligne suivante dans le /etc/hosts du Mac (avec l'IP de la VM) :

bash
echo "192.168.252.7 ramenez-julien-guichon.test" | sudo tee -a /etc/hosts

→ http://ramenez-julien-guichon.test:8081

Sans le script (commandes Docker à la main)
bash
cd ~/serveur/projet-final
docker build -t projet-final .                         # construit l'image
docker rm -f site                                      # supprime l'ancien conteneur s'il existe
docker run -d --name site -p 8081:80 projet-final      # lance le site sur le port 8081
curl http://localhost:8081                             # vérifie qu'il répond
Les scripts
scripts/deploy.sh : déployer le site
se place dans le dépôt et récupère les dernières modifications (git pull) ;
reconstruit l'image projet-final ;
supprime l'ancien conteneur site et en relance un nouveau sur le port 8081 ;
vérifie avec curl que le site répond : affiche Déploiement réussi, sinon un message d'échec et exit 1.
bash
./scripts/deploy.sh

Bonus : commande deployer. Pour lancer le déploiement depuis n'importe quel dossier :

bash
echo "alias deployer='~/serveur/projet-final/scripts/deploy.sh'" >> ~/.bashrc
source ~/.bashrc
deployer
scripts/stats.sh : analyser la fréquentation

Lit le journal Apache du conteneur (docker logs site 2>/dev/null) et affiche, avec des pipes (grep, cut, sort, uniq -c, sort -rn, head) :

le nombre de requêtes ;
le nombre d'erreurs 404 ;
l'IP la plus active ;
la page la plus demandée.

Si le conteneur n'existe pas ou n'a reçu aucune visite, il affiche un message clair et s'arrête avec exit 1.

bash
./scripts/stats.sh            # conteneur "site" par défaut
./scripts/stats.sh autre-nom  # bonus : nom du conteneur en a
