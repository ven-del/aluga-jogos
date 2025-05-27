import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'db', 'produtos.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    res.status(200).json(data);
  } catch (err) {
    console.error('Erro ao ler produtos.json:', err);
    res.status(500).json({ error: 'Erro ao ler os dados.' });
  }
}