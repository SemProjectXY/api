import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');
class FotoController {
  create(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ statusCode: 400, error: ['apenas png e jpeg'] });
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.json('Aluno nao existe');
      }
    });
  }
}

export default new FotoController();
