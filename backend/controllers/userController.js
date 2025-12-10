const client = require('../db.js'); 

exports.postLogin = async (req, res) => {
<<<<<<< HEAD
    const { matricula, senha } = req.body; 

=======
    const { matricula, senha } = req.body;

    console.log("Tentando logar:", matricula);

>>>>>>> 8811c7dc965777136023f4066b52e351b96fec64
    if (!matricula || !senha) {
        return res.status(400).json({ message: "Preencha matrícula e senha." });
    }

    try {
<<<<<<< HEAD
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
=======
        // ⚠️ ALTERE AQUI caso seu schema/tabela seja diferente
        const query = `
            SELECT matricula, senha 
            FROM "System"."user"
            WHERE matricula = $1 AND senha = $2
        `;

        const result = await client.query(query, [matricula, senha]);

        if (result.rows.length > 0) {
            console.log("LOGIN OK:", result.rows[0]);
            return res.status(200).json({
                success: true,
                message: "Login realizado com sucesso!",
                user: result.rows[0]
            });
        }

        console.log("LOGIN FALHOU");
        return res.status(401).json({
            success: false,
            message: "Matrícula ou senha incorretos"
        });

    } catch (error) {
        console.error("ERRO NO SQL:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};
>>>>>>> 8811c7dc965777136023f4066b52e351b96fec64
