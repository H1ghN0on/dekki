import axios from "axios";
import { DecksApi, AuthApi, TestingApi } from "./apis";

export const Api = () => {
  return {
    ...DecksApi(axios),
    ...AuthApi(axios),
    ...TestingApi(axios),
  };
};
