import { knexConnection } from "../../connection/connection.js";

const commentPost = async (req, res) => {
    const { texto } = req.body;
    const { id } = req.usuario;
    const { id_post } = req.params;

    if (!texto) {
        return res.status(400).json({ message: "Você precisa comentar algo para ser válido" });
    }
    try {
        const postagem = await knexConnection('postagens').where({ id: id_post, usuario_id: id }).first();
        if (!postagem) {
            return res.status(404).json({ message: "Post não está mais disponível" })
        }

        const comentario = await knexConnection('postagem_comentarios').insert({
            texto,
            usuario_id: id,
            postagem_id: id_post
        });

        return res.status(200).json({ message: "Comentário realizado com sucesso" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export default commentPost;