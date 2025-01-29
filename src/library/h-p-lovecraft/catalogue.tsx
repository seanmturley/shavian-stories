import AuthorCatalogue from "@components/author-catalogue";
import { author, stories } from "./metadata";

export default function Lovecraft() {
  return <AuthorCatalogue author={author} stories={stories} />;
}
