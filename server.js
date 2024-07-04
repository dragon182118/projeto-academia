const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Servindo arquivos estáticos da pasta raiz

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS estado (id INTEGER PRIMARY KEY, exnome TEXT, colorTDS TEXT, alavanca INTEGER, contadorX INTEGER, boolean INTEGER, ala INTEGER, dMes TEXT, dAno TEXT)");
});

// Endpoint para salvar estado
app.post('/save', (req, res) => {
  const { exnome, colorTDS, alavanca, contadorX, boolean, ala, dMes, dAno } = req.body;
  
  const query = `INSERT INTO estado (exnome, colorTDS, alavanca, contadorX, boolean, ala, dMes, dAno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [JSON.stringify(exnome), JSON.stringify(colorTDS), alavanca, contadorX, boolean, ala, dMes, dAno];
  
  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Endpoint para carregar estado
app.get('/load', (req, res) => {
  const query = "SELECT * FROM estado ORDER BY id DESC LIMIT 1";
  
  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json({
        exnome: JSON.parse(row.exnome),
        colorTDS: JSON.parse(row.colorTDS),
        alavanca: row.alavanca,
        contadorX: row.contadorX,
        boolean: row.boolean,
        ala: row.ala,
        dMes: row.dMes,
        dAno: row.dAno
      });
    } else {
      res.json({ error: "No data found" });
    }
  });
});

// Servir index.html por padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
