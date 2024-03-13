import { api } from "..";
import { endpoints} from "../endpoints";

export const getNews = () => {
    return api.get(endpoints.news)
}
