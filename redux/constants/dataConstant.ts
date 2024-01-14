import {TeamMemberData} from '../dataType';

export const EMPTY_MEMBER_DATA: TeamMemberData = {
  styleID: '-1',
  charID: '-1',
};

export const EMPTY_TEAM = [
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
];

export const DEFAULT_MEMBER: TeamMemberData = {
  level: 1,
  tensei: 0,
  totsu: 0,
};
