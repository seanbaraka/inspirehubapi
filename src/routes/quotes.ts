import {QuotationsController} from "../controller/QuotationsController";

const express = require('express');

const router = express.Router();

router.get('/all', QuotationsController.prototype.getAll);

router.get('/:id', QuotationsController.prototype.getOne);

router.post('/addquote', QuotationsController.prototype.createQuote);

router.delete('/remove/:id', QuotationsController.prototype.removeQuote);

module.exports = router;
