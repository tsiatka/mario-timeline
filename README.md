# mario-timeline
Timeline mario one page avec animations dans le cadre du cours d'intégration à ECV Digital Bordeaux

## Dev

```
npm run dev
```

## Build

```
npm run build
```

### Commentaires
Sur Chrome un "bug" fait que si la propriété scroll-snap-type est appliqué sur la balise <html> du projet, le scroll de la souris saute une section.
J'ai cherché des solutions sur internet mais aucune n'était adaptée à mon projet en raison de la timeline/nav en position fixed et de l'overflow.
J'ai donc choisi de désactiver le scroll à la molette sur Chrome.

En raison d'une restriction de Chrome qui empeche le déclenchement automatique des audios/vidéos, j'ai choisi de désactiver le son par défaut et d'intégrer le choix à l'utilisateur via un bouton.
