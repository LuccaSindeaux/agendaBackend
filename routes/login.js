const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const db = req.app.locals.db;

  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.json({ message: 'Login bem-sucedido', usuario: user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
