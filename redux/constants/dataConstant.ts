import {TeamMemberData, TeamDrafter} from '../dataType';

export const GET_ALL_STYLE_DATA = 'GET_ALL_STYLE_DATA';

export const EMPTY_MEMBER_DATA: TeamMemberData = {};

export const EMPTY_TEAM: TeamDrafter = {
  team: [],
};

export const DEFAULT_MEMBER: TeamMemberData = {
  level: 1,
  tensei: 0,
  totsu: 0,
};
