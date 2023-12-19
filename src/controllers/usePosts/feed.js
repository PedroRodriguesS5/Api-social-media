import { knexConnection } from "../../connection/connection.js";

const feed = async (req, res) => {
    const { id } = await req.usuario;
    const { offSet } = await req.query;

    const o = offSet ? offSet : 0;
    try {
        // const postagens = await knexConnection('postagens').limit(10).offset(0);
        const postagens = await knexConnection('postagens')
            .where('usuario_id', '!=', id)
            .limit(10)
            .offset(o);

        if (postagens.length === 0) {
            return res.status(200).json(postagens);
        }
        for (const postagem of postagens) {
            // usuario
            const usuario = await knexConnection('usuarios')
                .where({ id: postagem.usuario_id })
                .select('foto', 'username', 'verified')
                .first();

            postagem.usuario = usuario;

            // fotos
            const fotos = await knexConnection('postagem_foto')
                .where({ postagem_id: postagem.id })
                .select('image');

            postagem.fotos = fotos;
            // curtidas
            const numCurtidas = await knexConnection('postagem_curtidas')
                .where({ postagem_id: postagem.id })
                .select('usuario_id');

            postagem.curtidas = numCurtidas.length;

            // curtido por mim
            postagem.curtidoPorMim = numCurtidas.find(curtida => curtida.usuario_id === id) ? true : false;

            // comentarios
            const comentarios = await knexConnection('postagem_comentarios')
                .leftJoin('usuarios', 'usuarios.id', 'postagem_comentarios.usuario_id')
                .where({ postagem_id: postagem.id })
                .select('postagem_comentarios.texto', 'usuarios.username');

            postagem.comentarios = comentarios;

        }
        return res.status(200).json(postagens);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export default feed;