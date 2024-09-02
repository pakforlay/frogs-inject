import fetch from 'node-fetch';
import readline from 'readline';
import FormData from 'form-data';

const url = "https://pentil.pink/frog/pentil.php";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function postData(accounts, index = 0) {
  if (index >= accounts.length) {
    // Mulai ulang dari awal setelah semua akun diproses
    setTimeout(() => postData(accounts), 40000);
    return;
  }

  const accountData = accounts[index];

  const formData = new FormData();
  formData.append('full_query', accountData);

  const options = {
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Referer": "https://pentil.pink/frog/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: formData
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const timestamp = new Date().toLocaleTimeString();
      if (data.error) {
        console.log(`[${timestamp}] Error: ${data.error}`);
      } else if (data.message) {
        console.log(`[${timestamp}] Akun ${index + 1} Sukses inject coins, last balances ${data.message}`);
      }
      // Schedule the next account after 40 seconds
      setTimeout(() => postData(accounts, index + 1), 40000);
    })
    .catch(error => {
      const timestamp = new Date().toLocaleTimeString();
      console.error(`[${timestamp}] Error:`, error);
      // Schedule the next account after 40 seconds even if there's an error
      setTimeout(() => postData(accounts, index + 1), 40000);
    });
}

rl.question('Masukkan data akun (pisahkan dengan koma untuk beberapa akun): ', (input) => {
  const accounts = input.split(',').map(line => line.trim()).filter(line => line.startsWith('query_id='));
  postData(accounts);
  rl.close();
});
