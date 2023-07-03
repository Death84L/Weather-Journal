const APIKEY = '3e22a03359eb164a1f2f27d040e79b7e';
const default_Url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const Extracting = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error Message:', err);
  }
};

const firststep = async () => {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${default_Url}${zip}&APPID=${APIKEY}`;

  if (zip.length === 0 || content.length === 0) {
    alert('Fill it');
    return;
  }

  const weatherData = await Extracting(url);
  const temp = weatherData.main.temp;

  const d = new Date();
  const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

  const data = {
    date,
    temp,
    content,
  };

  await postData("http://localhost:8000/project", data);
  modify();
};

const modify = async () => {
  const dDiv = document.getElementById('date');
  const tDiv = document.getElementById('temp');
  const cDiv = document.getElementById('content');

  const Insight = await getData('/project');

  dDiv.innerText = Insight.date;
  tDiv.innerText = Insight.temp;
  cDiv.innerText = Insight.content;
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const button = document.querySelector('#generate');
button.addEventListener('click', firststep);
