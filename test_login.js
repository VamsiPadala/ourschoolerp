const axios = require('axios');

async function testLogin() {
  try {
    const res = await axios.post('https://ourschoolerp-m9y9k.ondigitalocean.app/api/v1/super-admin/login', {
      username: 'test',
      password: 'test'
    });
    console.log("JSON response:", res.data);
  } catch(e) {
    if (e.response) {
      console.log("JSON failed with", e.response.status, e.response.data);
    } else {
      console.log("JSON error", e.message);
    }
  }

  try {
    const data = new URLSearchParams();
    data.append('username', 'superadmin');
    data.append('password', 'super123'); // guessing
    const res2 = await axios.post('https://ourschoolerp-m9y9k.ondigitalocean.app/api/v1/super-admin/login', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    });
    console.log("FORM response:", res2.data);
  } catch(e) {
    if (e.response) {
      console.log("FORM failed with", e.response.status, e.response.data);
    } else {
      console.log("FORM error", e.message);
    }
  }
}
testLogin();
