Réseau Social d'entreprise from scratch.

Front-end : REACT/SASS

Back-end : NODEJS

(projet de fin d'étude) pour démarrer le backend : npm install => nodemon server

pour les variables d'environnement, remplir le fichier .env (suivre .env.example)

************* USER *****************

la route POST pour créer un compte
http://localhost:3000/api/user/signup

la route POST pour se logger
http://localhost:3000/api/user/login

la route GET pour afficher tous les utilisateurs
http://localhost:3000/api/user/

la route GET pour afficher un utilisateur
http://localhost:3000/api/user/:id

la route PUT pour désactiver un utilisateur
http://localhost:3000/api/user/disable/:id

la route PUT pour mettre un utilisateur en admin
http://localhost:3000/api/user/admin/:id

******\******* POST ********\*********

la route GET pour afficher tous les post
http://localhost:3000/api/post/

la route GET pour afficher un post avec son id
http://localhost:3000/api/post/:id

la route POST pour créer un post
http://localhost:3000/api/post/create

la route PUT pour modifier un post
http://localhost:3000/api/post/update/:id

la route DELETE pour effacer un post
http://localhost:3000/api/post/delete/:id

la route PATCH pour liker un post
http://localhost:3000/api/post/like/:id

la route PATCH pour unliker un post
http://localhost:3000/api/post/unlike/:id
