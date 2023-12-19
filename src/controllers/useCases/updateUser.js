const updateProfile = async (req, res) => {
    const {
        nome,
        username,
        email,
        imagem,
        bio,
        site,
        telefone,
        genero,
        password
    } = await req.body;

    const validateStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
    const { id } = await req.usuario;

    if (!nome && !email && !password && !imagem && !bio && !site && !telefone && !genero && !username) {
        return res.status(400).json({ message: "Deve atualizar pelo menos um campo" });
    }
    try {
        if (password) {
            if (!validateStrongPassword.test(password)) {
                return res.status(400).json({ message: "A senha deve conter no minimo 8 caracteres, ao menos 1 número e 1 caracter especial" });
            }
            const newPasswordCrypt = await bcrypt.hash(password, 10);
            const updatePasswordUser = await knexConnection("usuarios").where({ id }).update({ password: newPasswordCrypt });
        }

        if (email !== req.usuario.email) {
            const usuarioExsiste = await knexConnection("usuarios").where({ email }).first();
            if (usuarioExsiste) {
                return res.status(400).json({ message: "Email já está cadastrado" });
            }
        }
        const usuarioAtualizado = await knexConnection("usuarios").where({ id }).update({
            nome,
            username,
            email,
            foto: imagem,
            bio,
            site,
            telefone,
            genero,
        });

        if (!usuarioAtualizado) {
            return res.status(400).json({ message: "O usuário não foi atualizado" });
        }

        return res.status(201).json({ message: "Usuário atualizado com sucesso" });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export default updateProfile;