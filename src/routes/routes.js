import express from 'express';
import verifyLogin from '../middleware/verifyLogin.js';
import loginUser from '../controllers/useCases/login.js';
import registerUser from '../controllers/useCases/registerUser.js';
import updateProfile from '../controllers/useCases/updateUser.js';
import infoUser from '../controllers/useCases/infoUser.js'
import registerPost from '../controllers/usePosts/posts.js';
import likeRegister from '../controllers/usePosts/crutida.js';
import commentPost from '../controllers/usePosts/comentario.js';
import feed from '../controllers/usePosts/feed.js';


const routes = express();


// login do usuário
routes.post('/login', loginUser);

// cadastro do usuário
routes.post('/register', registerUser);

routes.use(verifyLogin);

// informações do usuário
routes.get('/profile', infoUser);
// atualização dos dados do usuário
routes.put('/profile', updateProfile);
// listagem do posts


routes.get('/post', feed);
// postagem dos posts
routes.post('/post', registerPost);
// comentários nos posts
routes.post('/post/:id_post/comment', commentPost);
// curitdas nos posts
routes.post('/post/:id_post/like', likeRegister);

export default routes;
