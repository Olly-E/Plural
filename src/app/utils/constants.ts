import { object, string } from "zod";

export const METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const OPTION_VALIDATION = object({
  name: string().min(1, "Required"),
  id: string().min(1, "Required"),
});

export const OPTION_VALIDATION_OPTIONAL = object({
  name: string().trim().optional(),
  id: string().trim().optional(),
}).optional();

export const EMPTY_OPTION = {
  name: '',
  id: ''
}