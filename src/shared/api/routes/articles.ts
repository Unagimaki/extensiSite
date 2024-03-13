import { api } from "..";
import { endpoints} from "../endpoints";

export const getArticle = (id: number) => {
    return api.get(endpoints.article(id))
}
