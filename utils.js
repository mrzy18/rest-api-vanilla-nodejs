import fs from 'fs';
import users from './data/usersData.json' with {type: 'json'};

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (error) => {
    console.log(error);
  });
}

function generateId() {
  let id = users[users.length - 1].id;
  id += 1;
  return id;
}

function verifyBodyRequest({ name, age, email }){
  return new Promise((resolve, reject) => {
    if (typeof name !== 'string') {
      reject(new Error('name property must be string'));
    }
    if (typeof age !== 'number') {
      reject (new Error('age property must be number'));
    }
    if (typeof email !== 'string') {
      reject (new Error('email property must be string'));
    }
    resolve({ name, age, email })
  });
}

function requestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req
      .on('data', (chunk) => body += chunk.toString())
      .on('end', () => {
        body = JSON.parse(body);
        if (!Object.keys(body).length) {
        reject(new Error('body must have at least one property'));
        }
        resolve(body);
    })
  })
}

export { writeDataToFile, generateId, verifyBodyRequest, requestBody };
