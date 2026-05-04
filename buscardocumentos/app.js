import express from "express";
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

// Datos de ejemplo (simula una base de datos)
const documents = [
  { id: 1, title: 'Introducción a Node.js', category: 'tecnología', author: 'Ana García', date: '2024-01-15' },
  { id: 2, title: 'Guía de Express.js', category: 'tecnología', author: 'Carlos López', date: '2024-02-20' },
  { id: 3, title: 'Historia del Arte', category: 'arte', author: 'María Rodríguez', date: '2024-03-10' },
  { id: 4, title: 'Cocina Mediterránea', category: 'gastronomía', author: 'Juan Martínez', date: '2024-04-05' },
  { id: 5, title: 'Fundamentos de EJS', category: 'tecnología', author: 'Laura Sánchez', date: '2024-05-18' },
];

// Endpoint unificado ✅
app.get('/search', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  console.log(query)
  const results = query
    ? documents.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.author.toLowerCase().includes(query)
      )
    : [];
  console.log(results)
  
  res.render('search', {
    results,       // array de documentos encontrados
    query: req.query.q || '',
    total: results.length,
  });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));