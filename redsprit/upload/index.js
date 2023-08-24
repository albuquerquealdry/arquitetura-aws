const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const axios = require('axios');


const app = express();
const port = 3000;

// Configurando o Multer para salvar os arquivos temporariamente na pasta 'uploads'
const storage = multer.memoryStorage(); // Armazena o arquivo em memória antes de enviá-lo ao S3
const upload = multer({ storage: storage });

// Configuração da AWS
AWS.config.update({
  accessKeyId: "mock",
  secretAccessKey: "mock",
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
// Rota para processar o upload do arquivo
app.post('/upload', upload.single('file'), async (req, res) => {
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

  // Fazer uma requisição à API para obter a senha aleatória
  let randomPassword;
  try {
    const response = await axios.get('https://bd2g2mut91.execute-api.us-east-1.amazonaws.com/default/GeneratePasswoard');
    randomPassword = response.data
  } catch (error) {
    console.error('Erro ao obter a senha aleatória da API:', error);
    res.status(500).send('Erro ao obter a senha aleatória da API.');
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

    res.send(`Arquivo enviado com sucesso para o S3. Sua senha personalizada: ${randomPassword}`);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
