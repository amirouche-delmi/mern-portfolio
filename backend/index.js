const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const dbConfig = require("./config/dbConfig");
const portfolioRoute = require("./routes/portfolioRoute");
const cors = require('cors');
const https = require('https'); // Utiliser 'https' pour des URLs sécurisées
const http = require('http');   // Utiliser 'http' pour des URLs non sécurisées

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;

// Fonction pour envoyer des requêtes périodiques
const keepAlive = () => {
  const url = 'https://mern-portfolio-frontend-xcx9.onrender.com'; // URL de votre portfolio
  const interval = 60 * 1000; // Par exemple, toutes les 5 minutes

  // Choisir le bon module (http ou https) en fonction du protocole de l'URL
  const requestModule = url.startsWith('https') ? https : http;

  const sendRequest = () => {
    requestModule.get(url, (res) => {
      console.log(`URL: ${url} - Status Code: ${res.statusCode}`);
    }).on('error', (e) => {
      console.error(`Error: ${e.message}`);
    });
  };

  sendRequest(); // Exécuter la requête immédiatement
  setInterval(sendRequest, interval); // Répéter toutes les X minutes
};

// Démarrer la fonction de keep-alive
keepAlive();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

