import type { Oopsie } from "../../oopsie/types/oopsie.types";

export interface OopsieGroup {
  name: string;
  description: string;
  oopsies: Oopsie[];
}

export interface OopsieGroupDtoForInsertion {
  name: string;
  description: string;
}
