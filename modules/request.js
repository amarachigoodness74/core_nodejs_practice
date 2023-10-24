function encrypt(data) {
  console.log('Data encrypted!');
  return data;
}

function save(data) {
  console.log('Saving encrypted data...');
  console.log('Data has been saved!');
}

const send = (data) => {
  const encryptedData = encrypt(data);
  save(encryptedData);
  return "Successful";
}

module.exports = {
  send
}