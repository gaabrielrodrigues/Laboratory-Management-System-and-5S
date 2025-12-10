const db = require('../db.js')

exports.getLabs = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "System"."laboratorios"')
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum laboratório encontrado!' })
        }
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('Erro ao buscar laboratórios:', err)
        res.status(500).json({ message: 'Erro interno do servidor ao buscar laboratórios' }) 
    }
}

exports.getLabsById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await db.query('SELECT * FROM "System"."laboratorios" WHERE id = $1', [id])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum laboratório encontrado com esse id' })
        }
        res.status(200).json(result.rows[0])

    } catch (err) {
        console.error('Erro ao buscar laboratório por id:', err)
        res.status(500).json({ message: 'Erro interno do servidor ao buscar laboratório por id' })
    }
}

exports.postCadastrarLaboratorio = async (req, res) => {
    const { nome, localizacao, coordenador_responsavel } = req.body;

    if (!nome || !localizacao || !coordenador_responsavel) {
        return res.status(400).json({ message: "Todos os campos (nome, localizacao, coordenador_responsavel) são obrigatórios." });
    }

    try {
        const query = `
            INSERT INTO "System"."laboratorios" (nome, localizacao, coordenador_responsavel)
            VALUES ($1, $2, $3)
            RETURNING id, nome;
        `;
        
        const values = [nome, localizacao, coordenador_responsavel];

        const result = await db.query(query, values);

        return res.status(201).json({ 
            message: `Laboratório "${result.rows[0].nome}" cadastrado com sucesso!`,
            id: result.rows[0].id
        }); 

    } catch (error) {
        console.error("Falha ao cadastrar laboratório:", error); 
        
        if (error.code === '23505' && error.constraint === 'laboratorios_nome_key') {
            return res.status(409).json({ 
                message: `O nome do laboratório "${req.body.nome}" já existe. Por favor, escolha outro nome.` 
            });
        }
        
        return res.status(500).json({ message: "Erro interno do servidor ao tentar cadastrar o laboratório." });
    }
};

exports.putEditarLaboratorio = async (req, res) => {
    const id = req.params.id;
    const { nome, localizacao, coordenador_responsavel } = req.body;
    if (!nome && !localizacao && !coordenador_responsavel) {
        return res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para edição." });
    }

    try {
        const query = `
            UPDATE "System"."laboratorios" 
            SET nome = $2, localizacao = $3, coordenador_responsavel = $4
            WHERE id = $1
            RETURNING *;
        `;
        const values = [id, nome, localizacao, coordenador_responsavel];
        
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Laboratório não encontrado para edição." });
        }

        return res.status(200).json({ 
            message: `Laboratório ID ${id} atualizado com sucesso.`,
            laboratorio: result.rows[0]
        });

    } catch (error) {
        console.error("Falha ao editar laboratório:", error); 
        return res.status(500).json({ message: "Erro interno do servidor ao tentar editar o laboratório." });
    }
};

exports.deleteLaboratorio = async (req, res) => {
    const id = req.params.id;
    
    try {
        const query = 'DELETE FROM "System"."laboratorios" WHERE id = $1 RETURNING id;';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Laboratório não encontrado para deleção." });
        }

        return res.status(200).json({ message: `Laboratório ID ${id} excluído com sucesso.` });

    } catch (error) {
        console.error("Falha ao deletar laboratório:", error); 
        return res.status(500).json({ message: "Erro interno do servidor ao tentar deletar o laboratório." });
    }
};

exports.getTotalLabs = async (req, res) => {
  try {
      const result = await db.query('SELECT COUNT(id) AS total_labs FROM "System"."laboratorios"');
      
      const total = result.rows[0].total_labs; 
      
      res.status(200).json({ totalLaboratorios: parseInt(total) });

  } catch (err) {
      console.error('Erro ao buscar total de laboratórios:', err);
      res.status(500).json({ message: 'Erro ao buscar métrica' });
  }
}