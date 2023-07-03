const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('Project_website'));

let project = {};

app.get('/project', (req, res) => {
  res.status(200).send(project);
});

app.post('/project', (req, res) => {
  project = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  };
  console.log(project);
  res.status(200).send({
    success: true,
    message: 'Success',
    data: project
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
