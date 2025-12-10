const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController'); 

router.post('/cadastrar', labController.postCadastrarLaboratorio);
router.get('/', labController.getLabs);
router.get('/:id', labController.getLabsById);
router.put('/:id', labController.putEditarLaboratorio);
router.delete('/:id', labController.deleteLaboratorio);
router.get('/metrics/total', labController.getTotalLabs);

module.exports = router;