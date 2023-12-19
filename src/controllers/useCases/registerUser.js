import { knexConnection } from "../../connection/connection.js";
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    const { username, password } = await req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Por favor insira todos os campos para concluir o cadastro" });
    }
    const validateStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
    if (!validateStrongPassword.test(password)) {
        return res.status(400).json({ message: "A senha deve conter no minimo 8 caracteres, ao menos 1 número e 1 caracter especial" });
    }

    try {
        const findSameUserName = await knexConnection('usuarios').where({ username }).first();

        if (findSameUserName) {
            return res.status(400).json({ message: "userName informado já existe" });
        }

        const passwordCrypt = await bcrypt.hash(password, 10);

        const userRegister = await knexConnection('usuarios').insert({
            username,
            password: passwordCrypt
        });

        if (!userRegister) {
            return res.status(400).json({ message: "Usuário não cadastrado" });
        }
        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (error) {
        res.status(500).json(error.message);
    }
}

const takeProfile = async (req, res) => {
    return res.status(200).json(req.usuario);
}

export default registerUser;