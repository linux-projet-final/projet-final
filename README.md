Le projet est une requête à notre bien aimé et dévoué professeur M. le grand et l'unique Abdellaoui Léo (développeur paladium, nations glory et ami de Julien Guichon 28 ans).

La requête étant la suivante: 
Ramener FuzeIII (Julien Guichon 28 ans) à l'école (l'école ECE, dans laquelle nous étudions(travaillons)).


Pour installer le site sur un serveur neuf, il faut suivre les étapes suivantes: 

Prérequis-Installer docker: 
sudo apt update && sudo apt install -y git docker.io curl
sudo usermod -aG docker $USER && newgrp docker

I- Cloner le dêpot et accéder au projet: 
git clone https://github.com/linux-projet-final/projet-final.git
cd projet-final
  pour vérifier avec cette commande, il doit apparaitre "-rwxr-xr-x" devant "deploy.sh" et "stats.sh"
ls -l scripts/   

II- configurer le nom de domaine local:
echo "127.0.0.1 ramenez-julien-guichon.test" | sudo tee -a /etc/hosts
  pour vérifier la dernière ligne doit etre "127.0.0.1 ramenez-julien-guichon.test"
tail -n 1 /etc/hosts

III- déployer le site avec deploy.sh:
./scripts/deploy.sh

IV- Simuler une requête et vérifier stats.sh:
curl -s http://<votre-equipe>.test:8081 | head -n 10
  pour afficher le compteur de requête: 
./scripts/stats.sh


Répartition des tâches:
Maxence s'est occupé de développer le serveur et les scripts.
Manech s'est occupé de la partie github, rulesets et de l'automatisation du workflow
