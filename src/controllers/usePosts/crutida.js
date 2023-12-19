import { knexConnection } from '../../connection/connection.js';

const likeRegister = async (req, res) => {
    const { id } = await req.usuario;
    const { id_post } = await req.params;
    try {
        const postagem = await knexConnection('postagens').where({ id: id_post }).first();

        if (!postagem) {
            return res.status(404).json({ message: "Esse post não está mais disponível" });
        }

        const isLiked = await knexConnection('postagem_curtidas').where({ usuario_id: id, postagem_id: postagem.id }).first();
        console.log(isLiked);
        if (isLiked) {
            await knexConnection('postagem_curtidas').where({ usuario_id: id, postagem_id: id_post }).del();
            return res.status(200).json({ message: "Descrutido" });
        }

        const liked = await knexConnection('postagem_curtidas').insert({
            postagem_id: id_post, usuario_id: id
        });

        res.status(200).json({ message: "Curtido" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export default likeRegister;