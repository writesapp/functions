const arc = require("@architect/functions");
const admin = require("firebase-admin");

const firebaseCreds = JSON.parse(Buffer.from(process.env.FIREBASE_KEY, "base64").toString());

admin.initializeApp({
  credential: admin.credential.cert(firebaseCreds),
  databaseURL: "https://writesapp-pl.firebaseio.com",
});

const db = admin.firestore();

async function route(req, res) {
  const snapshot = await db.collection("writes").get();

  const allDocs = [];

  snapshot.docs.map((doc) => {
    allDocs.push({ _id: doc.id, ...doc.data() });
  });

  return { json: allDocs };
}

exports.handler = arc.http.async(route);
