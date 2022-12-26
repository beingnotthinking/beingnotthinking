const axios = require('axios');

require('dotenv').config();

exports.handler = function instagram(event, context, callback) {
  const endpoint = 'https://graph.instagram.com';
  const userId = process.env.INSTAGRAM_CLIENT_ID;
  const fields = 'id,caption,media_url,permalink';
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limit = 3;
  const url = `${endpoint}/${userId}/media/?fields=${fields}&access_token=${token}&count=${limit}`;

  axios
    .get(url)
    .then(({ data: { data: posts } }) => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          posts.map(i => ({
            id: i.id,
            url: i.media_url,
            caption: i.caption,
          })),
        ),
      })
    })
    .catch((e) => {
      callback(e)
    })
}
