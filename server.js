const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const events = [];

app.get("/", (req, res) => {
  res.send(events);
});

app.get("/:eventId", (req, res) => {
  console.log({ events, reqId: req.params });

  const event = events.find((event) => {
    return event._id === req.params.eventId;
  });

  if (event) {
    res.status(200).send(event);
  } else res.status(404).send({ message: "Evento no encontrado" });
});

app.post("/", (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    res.status(400).send({
      message: `Todos los campos (title, description, date, location) son requeridos`,
    });
  }

  const newEvent = {
    title,
    description,
    date,
    location,
    _createdAt: new Date().toISOString(),
    _id: crypto.randomUUID(),
  };
  events.push(newEvent);
  res.status(201).send(newEvent);
});

app.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
