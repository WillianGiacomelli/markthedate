const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const multer = require("multer");

//middlewares
const verifyToken = require("../helpers/check-token");

//defirnir armazenamento
const diskStorage = require("../helpers/file-storage");
const upload = multer({ storage: diskStorage });

// criar evento
router.post(
  "/",
  verifyToken,
  upload.fields([{ name: "photos" }]),
  eventController.createEvent
);

//pegar todas os eventos publicos
router.get("/all", eventController.getAllPublicEvents);

//pegar todas os eventos do usuario com id
router.get("/userevents", verifyToken, eventController.getEventsByUserId);

//pegar evento com id do usuario e da evento
router.get(
  "/userevents/:id",
  verifyToken,
  eventController.getEventsByUserAndEventID
);

//pegar festas publicas ou privadas
router.get("/:id", eventController.getPulicAndPrivateEvents);

//deletar evento
router.delete("/", verifyToken, eventController.deleteEvent);

//modificar evento
router.put(
  "/",
  verifyToken,
  upload.fields([{ name: "photos" }]),
  eventController.modifyEvent
);
module.exports = router;
