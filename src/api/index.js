import axios from "axios";
import { DecksApi, AuthApi } from "./apis";

export const Api = () => {
  return {
    ...DecksApi(axios),
    ...AuthApi(axios),
  };
};
