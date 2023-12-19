import { knexConnection } from '../../connection/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import senhaHash from '../../senhaJwt.js';


const loginUser = async (req, res) => {
    const { username, password } = await req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username ou senha inválidos' });
    }
    try {
        const usuario = await knexConnection('usuarios').whereILike('username', `${username}`).first();

        if (!usuario) {
            return res.status(400).json({ message: 'Username ou senha inválidos' });
        }
        const senhaCorreta = await bcrypt.compare(password, usuario.password);

        if (!senhaCorreta) {
            return res.status(400).json({ message: 'Username ou senha inválidos' });
        }

        const dadosTokenUsuario = {
            id: usuario.id,
            username: usuario.username,
        }

        const token = jwt.sign(dadosTokenUsuario, senhaHash, { expiresIn: "8h" });

        const { senha: _, ...dadosUsuario } = usuario;

        res.status(200).json({
            usuario: dadosUsuario,
            token,
        });

    } catch (error) {
        res.status(500).json(error.message);
    }
}

export default loginUser;

