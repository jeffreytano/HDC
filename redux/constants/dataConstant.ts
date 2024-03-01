import {TeamMemberData, boosterSet} from '../dataType';

export const EMPTY_MEMBER_DATA: TeamMemberData = {
  Sid: '-1',
  Cid: '-1',
  levelGap: 100,
  level: 1,
  totsu: 0,
  tensei: 0,
};

export const EMPTY_TEAM = [
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
  EMPTY_MEMBER_DATA,
];

export const DEFAULT_BOOSTER_SETS: boosterSet[] = [
  {booster: 'None', chips: [{stat:'None',amount: 0}]},
  {booster: 'None', chips: [{stat:'None',amount: 0}]},
  {booster: 'None', chips: [{stat:'None',amount: 0}]},
  {booster: 'None', chips: [{stat:'None',amount: 0}]},
  {booster: 'None', chips: [{stat:'None',amount: 0}]},
  {booster: 'None', chips: [{stat:'None',amount: 0}]}
]

export const DEFAULT_MEMBER: TeamMemberData = {
  level: 1,
  tensei: 0,
  totsu: 0,
  levelGap: 100,
  Stat: {
    dp: 1,
    hp: 2,
    power: 3,
    agility: 4,
    physical: 5,
    mental: 6,
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

export const DEFAULT_STATMOD = {
  styleP: {
    dp: 0,
    hp: 0,
    power: 0,
    agility: 0,
    physical: 0,
    mental: 0,
    witness: 0,
    luck: 0,
  },
  styleC:{
    dp: 0,
    hp: 0,
    power: 0,
    agility: 0,
    physical: 0,
    mental: 0,
    witness: 0,
    luck: 0,
  },
  booster:{
    dp: 0,
    hp: 0,
    power: 0,
    agility: 0,
    physical: 0,
    mental: 0,
    witness: 0,
    luck: 0,
  },
  accessories:{
    dp: 0,
    hp: 0,
    power: 0,
    agility: 0,
    physical: 0,
    mental: 0,
    witness: 0,
    luck: 0
  }
}