import { knexConnection } from '../connection/connection.js';
import jwt from 'jsonwebtoken';
import senhaJwt from '../senhaJwt.js';


const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        const token = await authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaJwt);

        const usuarioExiste = await knexConnection('usuarios').where({ id }).as('id_user').first();

        if (!usuarioExiste) {
            return res.status(404).json({ message: 'Token inválido' });
        }

        const { senha, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export default verifyLogin;