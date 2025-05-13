const express = require('express');
const router = express.Router();

router.get('/horarios', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.query(`
      SELECT id, 
             TO_CHAR(data, 'DD/MM/YYYY') AS data, 
             TO_CHAR(hora, 'HH24:MI') AS hora 
      FROM horarios_disponiveis 
      WHERE ocupado = FALSE 
      ORDER BY data, hora
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/agendar', async (req, res) => {
  const db = req.app.locals.db;
  const { nome, email, telefone, horarioId } = req.body;

  try {
    const pacienteResult = await db.query(
      `INSERT INTO pacientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING id`,
      [nome, email, telefone]
    );
    const pacienteId = pacienteResult.rows[0].id;

    await db.query(
      `INSERT INTO agendamentos (paciente_id, horario_id) VALUES ($1, $2)`,
      [pacienteId, horarioId]
    );

    await db.query(`UPDATE horarios_disponiveis SET ocupado = TRUE WHERE id = $1`, [horarioId]);

    res.json({ success: true, message: 'Agendamento feito com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
