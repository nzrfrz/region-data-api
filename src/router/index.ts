import express from "express";
import regionDataRouter from "./regionDataRouter";

const router = express.Router();

export default (): express.Router => {
  regionDataRouter(router);
  
  return router;
};