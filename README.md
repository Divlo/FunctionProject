<h1 align="center"><a href="https://function.divlo.fr/">FunctionProject</a></h1>

<p align="center">
  <strong>Apprenez la programmation grâce à l'apprentissage par projet alias fonction.</strong>
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <img src="https://img.shields.io/github/repo-size/Divlo/FunctionProject" alt="Repo Size">
  <a href="https://github.com/Divlo/FunctionProject/commits/master"><img src="https://img.shields.io/github/commit-activity/m/Divlo/FunctionProject" alt="Commit Activity"></a>
  <a href="https://github.com/Divlo/FunctionProject/graphs/contributors"><img src="https://img.shields.io/github/contributors/Divlo/FunctionProject" alt="Contributors"></a>
  <img src="https://img.shields.io/github/stars/Divlo/FunctionProject?style=social" alt="Stars">
  <br/> <br/>
  <a href="https://function.divlo.fr/"><img src="./.github/FunctionProject.png" alt="FunctionProject" /></a>
</p>

## ⚙️ À propos

**FunctionProject** regroupe plein de **fonctions** sous différentes catégories. Chaque fonction dispose d'une partie "**Utilisation**", et d'une partie "**Article**" pour expliquer le code de celle-çi (le plus souvent, le code est rédigé en **Javascript**).

En plus de présenter des fonctions, FunctionProject est un **blog** ce qui permet la publication d'article à propos du **développement web** et plus généralement de la **programmation informatique**.

Si vous aimez le projet, vous pouvez aider à **le faire connaître** en utilisant [#FunctionProject](https://twitter.com/hashtag/FunctionProject) sur **Twitter**. 🐦

Le projet est disponible sur function.divlo.fr.

## 🚀 Open Source 

Le partage est essentiel afin de progresser, l'**Open Source** permet l'entraide et le **partage de connaissance** entre développeurs.

Si vous voulez **contribuer**, avant toute chose écrivait une **"[issue](https://github.com/Divlo/FunctionProject/issues)" sur GitHub** à propos des changements que vous voulez apporter et on pourra en **discuter avec grand plaisir**. 😉

## 🌐 Installation

**Note :** En installant, la version locale vous n'aurez pas accès aux données des fonctions etc. Seulement une **base de donnée vide**.

### Prérequis :

- NodeJS (et npm) → version récente
- Base de donnée MySQL → J'utilise Wamp ce qui me permet d'avoir phpmyadmin.

### Commandes (à suivre dans l'ordre) :

```sh
# Cloner le projet
git clone https://github.com/Divlo/FunctionProject.git FunctionProject

# Aller à la racine du projet
cd FunctionProject

# Installer les packages/dépendances
cd ./api
npm install
cd ../website
npm install
```

Vous devrez ensuite configurer l'API en créant un fichier `.env` à la racine du dossier `/api` et prendre exemple du fichier `.env.example` avec votre configuration.

### Lancer l'environnement de développement : 

Dans deux terminals séparés : 

- Lancer le front-end en allant dans `/website`
```sh
npm run dev # front-end lancé sur http://localhost:3000
```
- Lancer l'api en allant dans `/api`
```sh
npm run dev # API lancé sur http://localhost:8080
```

Enjoy! 😃

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.