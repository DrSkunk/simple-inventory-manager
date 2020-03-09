import express from "express";
import item from "./item";
import group from "./group";
import receipt from "./receipt";

const router = express.Router();

router.use("/item", item);
router.use("/group", group);
router.use("/receipt", receipt);

module.exports = router;
