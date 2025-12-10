const client = require('../db.js'); 

exports.postLogin = async (req, res) => {
    const { matricula, senha } = req.body;

    console.log("Tentando logar:", matricula);

    if (!matricula || !senha) {
        return res.status(400).json({ message: "Preencha matrícula e senha." });
    }

    try {
        const query = 'SELECT matricula FROM "System"."user" WHERE matricula = $1 AND senha = $2';
        const result = await client.query(query, [matricula, senha]);

        if (result.rows.length > 0) {
            return res.status(200).json({ 
                message: "Login bem-sucedido",
                user: { matricula: result.rows[0].matricula } 
            }); 
        } else {
            return res.status(401).json({ message: "Matrícula ou senha inválida." });
        }
    } catch (error) {
        console.error("Falha ao processar login:", error); 
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};