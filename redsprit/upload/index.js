const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Configurando o Multer para salvar os arquivos temporariamente na pasta 'uploads'
const storage = multer.memoryStorage(); // Armazena o arquivo em memória antes de enviá-lo ao S3
const upload = multer({ storage: storage });

// Configuração da AWS
AWS.config.update({
  accessKeyId: 'AKIAXT2P4KS4HU7EFWVX',
  secretAccessKey: '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',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

// Configurando o middleware para servir os arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

// Rota para exibir a página de upload de arquivo
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>RedSprite Light QuickStart</title>
      <link rel="stylesheet" href="/public/style.css">
    </head>
    <body>
      <div class="container">
        <h1>RedSprite Light QuickStart</h1>
        <p>Preencha o campo RS-identity abaixo para enviar o arquivo:</p>
        <input type="text" id="rsIdentityInput" name="rsIdentity" placeholder="Digite o RS-identity...">
        <div class="drop-area" id="dropArea">
          <p>Arraste e solte um arquivo aqui ou clique para selecionar.</p>
          <input type="file" id="fileInput" name="file">
        </div>
        <button id="uploadButton" style="display:none;">Enviar</button>
        <p id="uploadMessage"></p>
      </div>
      <script src="/public/script.js"></script>
    </body>
    </html>
  `);
});

// Rota para processar o upload do arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  const rsIdentityToken = req.body.rsIdentity;
  if (rsIdentityToken !== 'redred') {
    res.status(403).send('Token RS-identity inválido.');
    return;
  }

  const file = req.file;
  if (!file) {
    res.status(400).send('Nenhum arquivo foi enviado.');
    return;
  }

  const params = {
    Bucket: 'red-sprite-data',
    Key: file.originalname,
    Body: file.buffer
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Erro ao fazer o upload para o S3:', err);
      res.status(500).send('Erro ao fazer o upload para o S3.');
      return;
    }

    // Gerar uma senha personalizada
    const password = crypto.randomBytes(6).toString('hex');

    res.send(`Arquivo enviado com sucesso para o S3. Sua senha personalizada: ${password}`);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
