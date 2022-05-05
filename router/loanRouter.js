const router = require("express").Router();
const {createLoan, readLoan, updateLoan, oneLoan} = require("../controllers/loanControllers");

router.post('/api/createLoan',createLoan);
router.get('/api/readLoan',readLoan);
router.put('/api/updateLoan',updateLoan);
router.get('/api/oneLoan',oneLoan);

module.exports = router;