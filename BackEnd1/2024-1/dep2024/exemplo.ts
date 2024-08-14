app.get("users/:email", (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        if (!email) {
            res.status(400).send("Email inválido");
        }
        const usuario = await connection.raw(`SELECT * from users WHERE email = ${email}`);
        if (!usuario) {
            res.status(404).send("email não encontrado");
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
})