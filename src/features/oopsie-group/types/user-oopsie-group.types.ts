import type { BaseEntity } from "../../../shared/types/base.types";
import type { OopsieGroup } from "./oopsie-group.type";

export interface UserOopsieGroup extends BaseEntity{
  userId: string;
  groupId: string;
  group: OopsieGroup;
}

export interface UserOopsieGroupDtoForInsertion{
  userId: string;
  groupId: string;
}