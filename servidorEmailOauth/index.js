require("dotenv").config();
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const express = require("express");

const app = express();
const PORT = 3000;

// Carrega as credenciais diretamente do arquivo JSON
const CREDENTIALS = JSON.parse(fs.readFileSync("credentials.json"));
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = "token.json";

// Autoriza com OAuth2
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  "urn:ietf:wg:oauth:2.0:oob"
);

  // Valida se já existe token salvo, caso seja a primeira vez, solicita um novo
  fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    console.log("Nenhum token encontrado, iniciando autenticação OAuth...");
    return getNewToken(oAuth2Client, callback);
  }

  oAuth2Client.setCredentials(JSON.parse(token));
  callback(oAuth2Client);
});
}

// Solicita novo token (so na primeira vez, manualmente)
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Autorize o login do usuário configurado para acessar:\n", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nInsira o código de autorização disponivel no link logo a cima: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log("Token armazenado em", TOKEN_PATH);
      callback(oAuth2Client);
    });
  });
}

// Endpoint que o Cypress pode chamar
app.get("/email", (req, res) => {
  authorize(CREDENTIALS, async (auth) => {
    const gmail = google.gmail({ version: "v1", auth });

    try {
      // Pega os últimos 5 e-mails
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 5,
        q: "newer_than:1d", // opcional: só emails de hoje
      });

      const messages = response.data.messages;
      if (!messages || messages.length === 0) {
        return res.json({ message: "Nenhum e-mail encontrado." });
      }

      // Lê o conteúdo do último e-mail recebido
      // (pode ser ajustado para pegar o mais recente ou o primeiro da lista)
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: messages[0].id,
        format: "full",
      });

      const bodyData = msg.data.payload.parts?.find(
        (part) => part.mimeType === "text/plain"
      )?.body?.data;

      const decoded = Buffer.from(bodyData, "base64").toString("utf-8");

      res.json({
        subject: msg.data.payload.headers.find((h) => h.name === "Subject").value,
        from: msg.data.payload.headers.find((h) => h.name === "From").value,
        body: decoded,
      });
    } catch (err) {
      console.error("Erro ao buscar e-mail:", err);
      res.status(500).send("Erro ao buscar e-mail.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});