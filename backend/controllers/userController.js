const db = require('../db.js')


exports.getLogin = async (req, res) => {
    const {
        user,
        senha,
    } = req.body

    try {
        const result = await db.query('SELCT user, senha FROM usuario WHERE user = ? AND senha = ?', [user,senha])
        if (result.rows){
          return res.status(200)
        }        
        res.status(401)
    } catch (error) {
        console.log("Falha ao encontrar  "+error)
        res.status(500)
    }

}