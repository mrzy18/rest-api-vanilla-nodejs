import users from '../model/userModel.js';
import { requestBody, verifyBodyRequest } from '../utils.js';

async function getUsers(res) {
  try {
    const data = await users.findAllUser();
    res.end(JSON.stringify(data));
  } catch (error) {
    console.info(error);
  }
}

async function getUserById(res, id) {
  try {
    const data = await users.findUserById(id);
    res.end(JSON.stringify(data));
  } catch (error) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'id not found' }));
  }
}

async function postUser(req, res) {
  try {
    const { name, age, email } = await requestBody(req);
    const verifiedRequestBody = await verifyBodyRequest({ name, age, email });
    const newUser = await users.addNewUser(verifiedRequestBody);
    res.statusCode = 201;
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        message: error.message,
      })
    );
  }
}

async function putUser(req, res, id) {
  try {
    const user = await users.findUserById(id);
    const { name = user.name, age = user.age, email = user.email } = await requestBody(req);
    await verifyBodyRequest({ name, age, email });

    const updatedUser = await users.updateUser(id, { name, age, email });
    res.end(JSON.stringify(updatedUser));
  } catch (error) {
    if (error.message === 'NOT FOUND') {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          message: 'id not found',
        })
      );
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
    }
  }
}

async function deleteUser(res, id) {
  try {
    const user = await users.findUserById(id);
    await users.removeUser(user.id);
    res.end(JSON.stringify({
      message: `user with ${id} has been deleted`
    }));
  } catch (error) {
    res.statusCode = 404;
    res.end(JSON.stringify({
      message: `user with ${id} not found`
    }));
  }
}

export default { getUsers, getUserById, postUser, putUser, deleteUser };
