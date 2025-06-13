import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.port || 3011;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/bosses', async (req, res) => {
  try {
    const response = await fetch('https://eldenring.fanapis.com/api/bosses?limit=100');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/boss/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://eldenring.fanapis.com/api/bosses/${id}`);
    const boss = await response.json();
    res.render('show', { boss: boss.data });
  } catch (err) {
    res.status(500).send('Failed to load boss');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});