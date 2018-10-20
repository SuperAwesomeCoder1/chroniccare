require("dotenv").config();
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Firebase database
admin.initializeApp();


