import fetch from 'node-fetch';
import fs from 'fs';

const url = "https://pentil.pink/frog/pentil.php";
const headers = {
  "accept": "*/*",
  "accept-language": "en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7",
  "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryHUAcnZJZKfbHWJjh",
  "priority": "u=1, i",
  "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "cookie": "PHPSESSID=3161cd3ceec0af30080f59681e5072d1",
  "Referer": "https://pentil.pink/frog/",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

function postData() {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const body = `------WebKitFormBoundaryHUAcnZJZKfbHWJjh\r\nContent-Disposition: form-data; name=\"full_query\"\r\n\r\n${data}\r\n------WebKitFormBoundaryHUAcnZJZKfbHWJjh--\r\n`;

    const options = {
      method: 'POST',
      headers: headers,
      body: body
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });
}

// Jalankan proses setiap 60 detik (60000 milidetik)
setInterval(postData, 60000);
