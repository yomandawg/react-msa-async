const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const profanity = ['orange', 'banana', 'apple'];

app.post('/events', async (req, res) => {
  console.log('Event:', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = profanity.some((word) => data.content.includes(word))
      ? 'rejected'
      : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Moderation on 4003');
});
