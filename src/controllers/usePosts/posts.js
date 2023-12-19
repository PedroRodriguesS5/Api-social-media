import { knexConnection } from '../../connection/connection.js';

const registerPost = async (req, res) => {
    const { id_user } = req.usuario;
    const { texto, fotos } = req.body;

    if (!fotos || !fotos.lenght === 0) {
        return res.status(404).json({ message: "É necessário ao menos uma foto" });
    }
    try {
        const postagem = await knexConnection('postagens').insert({
            texto,
            usuario_id: id_user,
        }).returning('*');

        if (!postagem) {
            return res.status(400).json({ message: "Não foi possível realizar o post" });
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id
        }
        const postagemFoto = await knexConnection('postagem_foto').insert(fotos);

        if (!postagemFoto) {
            await knexConnection('postagens').where({ id: postagem[0].id }).del();
            return res.status(400).json({ message: "Não foi possível realizar o post" });
        }

        return res.status(201).json({ message: "Post criado com sucesso" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export default registerPost;
