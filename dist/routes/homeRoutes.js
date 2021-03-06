"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _HomeController2.default.create);
router.get('/', _loginRequired2.default, _HomeController2.default.index);
router.get('/:id', _loginRequired2.default, _HomeController2.default.show);

router.put('/', _loginRequired2.default, _HomeController2.default.update);
router.delete('/', _loginRequired2.default, _HomeController2.default.remove);

exports. default = router;
