require("dotenv").config();
const axios = require("axios");
const qs = require("qs");

(async () => {
  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  const data = { grant_type: "client_credentials" };
  const options = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
    url: "https://accounts.spotify.com/api/token",
  };
  const response = await axios(options);

  const { access_token } = response.data;
  console.log(access_token);
})();