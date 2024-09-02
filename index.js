import fetch from 'node-fetch';
import readline from 'readline';

// Membuat antarmuka readline untuk membaca input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Tanyakan kepada pengguna untuk memasukkan query_id
rl.question('Masukkan query_id: ', (queryId) => {
  // Data yang akan dikirim, dengan query_id yang dimasukkan oleh pengguna
  const data = `${queryId}`;

  // URL dan headers untuk permintaan
  const url = "https://pentil.pink/frog/pentil.php";

  const headers = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryWSPPYBGBsdbivkz4",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://pentil.pink/frog/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  // Bungkus data ke dalam format multipart/form-data
  const body = `------WebKitFormBoundaryWSPPYBGBsdbivkz4\r\nContent-Disposition: form-data; name="full_query"\r\n\r\n${data}\r\n------WebKitFormBoundaryWSPPYBGBsdbivkz4--\r\n`;

  function sendRequest() {
    const options = {
      method: 'POST',
      headers: headers,
      body: body
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log('Error:', data.error);
        } else if (data.message) {
          console.log(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  // Jalankan fungsi sendRequest setiap 1 menit
  setInterval(sendRequest, 60000);

  // Tutup antarmuka readline
  rl.close();
});
