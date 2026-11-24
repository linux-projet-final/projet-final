#!/bin/bash

# Nom du conteneur (1er argument ou "site" par défaut)
NOM="${1:-site}"

# Vérifie que le conteneur existe
if ! docker ps -a --format '{{.Names}}' | grep -qx "$NOM"; then
    echo "Erreur : conteneur '$NOM' introuvable."
    exit 1
fi

# Récupère les requêtes HTTP des logs Apache
LOGS=$(docker logs "$NOM" 2>/dev/null | grep -E '"(GET|POST|HEAD) ')

# Vérifie qu'il y a au moins une visite
if [ -z "$LOGS" ]; then
    echo "Aucune visite enregistrée."
    exit 1
fi

# Calcule et affiche les 4 statistiques
echo "Requêtes : $(echo "$LOGS" | wc -l)"
echo "Erreurs 404 : $(echo "$LOGS" | cut -d' ' -f9 | grep -c '^404$')"
echo "IP la plus active : $(echo "$LOGS" | cut -d' ' -f1 | sort | uniq -c | sort -rn | head -n 1 | awk '{print $2}')"
echo "Page la plus demandée : $(echo "$LOGS" | cut -d' ' -f7 | sort | uniq -c | sort -rn | head -n 1 | awk '{print $2}')"
