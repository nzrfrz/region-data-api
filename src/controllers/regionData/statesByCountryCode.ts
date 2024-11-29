import express from "express";
import {
  status,
  message,
  responseHelper,
  getRegionDB,
} from "../../_utils";

export const statesByCountryCode = async (req: express.Request, res: express.Response) => {
  try {
    const {iso2CountryCode} = req.params;

    const regionDB = await getRegionDB();
    const statesCollection = regionDB.collection("states");
    const statesList = await statesCollection.find({ country_code: iso2CountryCode }).toArray();

    responseHelper(res, status.success, message.onlySuccess, statesList);
  } catch (error) {
    responseHelper(res, status.errorServer, message.errorServer, error.toString());
  }
};