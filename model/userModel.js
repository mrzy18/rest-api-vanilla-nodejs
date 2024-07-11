import users from '../data/usersData.json' with {type: 'json'};
import { generateId, writeDataToFile } from '../utils.js';

function findAllUser(){
  return new Promise((resolve) => resolve(users));
};

function findUserById(id){
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      reject(new Error(`NOT FOUND`));
    }
    resolve(user);
  });
}

function addNewUser(user){
  return new Promise((resolve) => {
    const newUser = {id: generateId(), ...user};
    users.push(newUser);
    writeDataToFile('./data/usersData.json', users);
    resolve(newUser);
  });
}

function updateUser(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((i) => i.id === id);
    users[index] = {id, ...user};
    writeDataToFile('./data/usersData.json', users);
    resolve(users[index]);
  })
}

function removeUser(id) {
  return new Promise((resolve) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    writeDataToFile('./data/usersData.json', filteredUsers);
    resolve();
  })
}

export default { findAllUser, findUserById, addNewUser, updateUser, removeUser};