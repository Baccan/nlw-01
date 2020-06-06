import express from "express";

const app = express();

app.use(express.json());

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// GET: Buscar um ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informalçao do back-end

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota, geralmente opcionais para filtros, paginação...
// Request Body: Parâmetros para criação/atualização de informações

const users = ["Baccan", "Flávio", "Diego"];

app.get("/users", (req, res) => {
  const search = String(req.query.search).toLowerCase();

  const filteredUsers = search
    ? users.filter((user) => user.toLowerCase().includes(search))
    : users;

  return res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id > users.length) {
    return res.json({ error: "User ID not exists" });
  }

  return res.json(users[id]);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name) return res.json({ error: "Name is not defined" });
  if (!email) return res.json({ error: "E-mail is not defined" });

  const user = {
    name,
    email,
  };

  return res.json(user);
});

app.listen(3333);
