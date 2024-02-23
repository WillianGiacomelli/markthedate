const jwt = require("jsonwebtoken");

const Event = require("../models/event");
const User = require("../models/user");

//helpers
const getUserByToken = require("../helpers/get-user-by-token");

const createEvent = async (req, res) => {
  //req data
  const title = req.body.title;
  const description = req.body.description;
  const eventDate = req.body.event_date;

  let files = [];

  if (req.files) {
    files = req.files.photos;
  }

  //validações
  if (title === "null" || description === "null" || eventDate === "null") {
    return res.status(400).json({ error: "Preencha nome, descrição e data" });
  }

  //verificar usuario
  const token = req.header("auth-token");
  const userByToken = await getUserByToken(token);

  const userId = userByToken._id.toString();

  try {
    const user = await User.findOne({ _id: userId });

    // criar array de photos com o caminho das imagens
    let photos = [];

    if (files) {
      files.forEach((photo, i) => {
        photos[i] = photo.path;
      });
    }

    const event = new Event({
      title: title,
      description: description,
      eventDate: eventDate,
      photos: photos,
      privacy: req.body.privacy,
      userId: user._id.toString(),
    });

    try {
      const newEvent = await event.save();
      res.json({
        error: null,
        msg: "Evento criado com sucesso",
        data: newEvent,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } catch (erro) {
    return res.status(400).json({ error: "Acesso negado!" });
  }
};

const getAllPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({ privacy: false }).sort([["_id", -1]]);
    res.json({ error: null, events: events });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    //verificar usuario
    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    const events = await Event.find({ userId: userId });

    if (!events) {
      return res
        .status(200)
        .json({ error: null, msg: "Não há eventos cadastrados" });
    }

    res.json({ error: null, events: events });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getEventsByUserAndEventID = async (req, res) => {
  try {
    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();
    const eventId = req.params.id;

    const event = await Event.findOne({ _id: eventId, userId: userId });
    res.json({ error: null, event: event });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getPulicAndPrivateEvents = async (req, res) => {
  try {
    //encontrar festa
    const id = req.params.id;

    const event = await Event.findOne({ _id: id });

    //evento publico
    if (event.privacy == false) {
      res.json({ error: null, event: event });
    } else {
      const token = req.header("auth-token");
      const userByToken = await getUserByToken(token);

      const userId = userByToken._id.toString();
      const eventUserId = event.userId.toString();

      //checar se o usuario é dono da festa
      if (eventUserId == userId) {
        res.json({ error: null, event: event });
      } else {
        res.json({ error: null, event: event });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Acesso negado!" });
  }
};

const deleteEvent = async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token);
  const eventId = req.body.id;
  const userId = user._id.toString();

  try {
    await Event.deleteOne({ _id: eventId, userId: userId });
    res.json({
      error: null,
      msg: "Evento removido com sucesso",
    });
  } catch (error) {
    res.status(400).json({ error: "Acesso negado!" });
  }
};

const modifyEvent = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const eventDate = req.body.eventDate;
  const eventId = req.body.id;
  const eventUserId = req.body.userId;

  let files = [];

  if (req.files) {
    files = req.files.photos;
  }

  //validações
  if (title == "null" || description == "null" || eventDate == "null") {
    return res.status(400).json({ error: "Preencha nome, descrição e data" });
  }

  //verificar usuario
  const token = req.header("auth-token");
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();
  // console.log(userByToken, userId, eventUserId);

  if (userId != eventUserId) {
    return res.status(400).json({ error: "Acesso negado! " });
  }

  //construir objeto do evento
  const event = {
    id: eventId,
    title: title,
    description: description,
    eventDate: eventDate,
    privacy: req.body.privacy,
    userId: userId,
  };

  let photos = [];

  if (files && files.lenght > 0) {
    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });
  }

  event.photos = photos;

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, userId: userId },
      { $set: event },
      { new: true }
    );
    res.json({
      error: null,
      msg: "Evento atualizado com sucesso",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createEvent,
  getAllPublicEvents,
  getEventsByUserId,
  getEventsByUserAndEventID,
  getPulicAndPrivateEvents,
  deleteEvent,
  modifyEvent,
};
