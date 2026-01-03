import type { BaseEntity } from "../../../shared/types/base.types";
import type { Oopsie } from "../../oopsie/types/oopsie.types";

export interface OopsieGroup {
  name: string;
  description: string;
  oopsies: Oopsie[];
}

export interface UserOopsieGroup extends BaseEntity{
  userId: string;
  groupId: string;
  group: OopsieGroup;
}

export interface UserOopsieGroupDtoForInsertion{
  userId: string;
  groupId: string;
}