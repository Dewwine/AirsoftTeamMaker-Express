"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const managerController_1 = require("../controllers/managerController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route('/teamRequests').get(auth_1.protect, (0, auth_1.authorize)(2), managerController_1.getTeamRequests);
router.route('/player/:id/approve').put(auth_1.protect, (0, auth_1.authorize)(2), managerController_1.approveTeam);
router.route('/player/:id/decline').put(auth_1.protect, (0, auth_1.authorize)(2), managerController_1.declineTeam);
exports.default = router;
