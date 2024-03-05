import {TeamMemberData, boosterSet} from '../dataType';

export const EMPTY_MEMBER_DATA: TeamMemberData = {
  Sid: -1,
  Cid: -1,
  levelGap: 100,
  level: 1,
  totsu: 0,
  tensei: 0,
  statType: 'Free',
};

export const DEFAULT_STATMOD = {
  styleP: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
  styleC: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
  limitBreak: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
  tensei: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
  booster: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
  accessories: {
    dp: 0,
    hp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    spirit: 0,
    witness: 0,
    luck: 0,
  },
};

export const EMPTY_TEAM = [
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
];

export const EMPTY_STATMOD = [
  DEFAULT_STATMOD,
  DEFAULT_STATMOD,
  DEFAULT_STATMOD,
  DEFAULT_STATMOD,
  DEFAULT_STATMOD,
  DEFAULT_STATMOD,
];

export const DEFAULT_BOOSTER_SETS: boosterSet[] = [
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
  {booster: 'None', chips: [{stat: 'None', amount: 0}]},
];

export const DEFAULT_MEMBER: TeamMemberData = {
  level: 1,
  tensei: 0,
  totsu: 0,
  Cid: -1,
  Sid: -1,
  levelGap: 100,
  statType: 'Free',
  Stat: {
    dp: 1,
    hp: 2,
    strength: 3,
    dexterity: 4,
    constitution: 5,
    spirit: 6,
    witness: 7,
    luck: 8,
  },
};

export const SKILL_TARGET = {
  0: 'N/A',
  1: '単体',
  2: '全体',
  3: '味方前衛',
  4: '味方全体',
  5: '味方単体',
  6: '味方後衛',
};

export const ELEMENT = {
  0: '無',
  1: '火',
  2: '氷',
  3: '雷',
  4: '光',
  5: '闇',
};

export const WEAPON = {
  0: '無',
  1: '斬',
  2: '突',
  3: '打',
};
