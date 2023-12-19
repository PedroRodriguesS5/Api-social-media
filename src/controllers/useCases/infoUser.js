const infoUser = async (req, res) => {
    res.status(200).json(req.usuario);
}

export default infoUser;