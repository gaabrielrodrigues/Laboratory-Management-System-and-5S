const db = require('../db.js')

exports.getLabs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM laboratorios')
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum laboratório encontrado!' })
    }
    res.status(200).json(result.rows)
  } catch (err) {
    console.log('Erro ao buscar laboratórios', err)
    res.status(500).json({ message: 'Erro ao buscar categorias' })
  }
}

exports.getLabsById = async (req, res) => {
  const id = req.params.id
  try {
    const result = await db.query('SELECT * FROM laboratorio WHERE id = ?', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum laboratório encontrado com esse id' })
    }
    res.status(200).json(result.rows[0])

  } catch (err) {
    console.log('Erro ao buscar laboratório por id', err)
    res.status(500).json({ message: 'Erro ao buscar laboratório por id' })
  }
}


//continuar