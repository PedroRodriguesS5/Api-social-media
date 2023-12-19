const validateRegisterUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Por favor insira todos os campos para concluir o cadastro" });
        }
        const validateStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
        if (!validateStrongPassword.test(password)) {
            return res.status(400).json({ message: "A senha deve conter no minimo 8 caracteres, ao menos 1 número e 1 caracter especial" });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
    next();
}

export default validateRegisterUser;