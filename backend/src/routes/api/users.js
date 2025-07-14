import express from 'express';
import usersController from '../../controllers/usersController';
import ROLES_LIST from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';

const router = express.Router();

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/api/entries')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/api/goals')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/api/activities')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);


router.route('/entries')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/goals')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

router.route('/activities')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteUser);

export default router;