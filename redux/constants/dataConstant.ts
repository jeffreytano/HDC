import {
  TeamMemberData,
  accessory,
  boosterSet,
  stat,
  styleData,
} from '../dataType';

export const EMPTY_MEMBER_DATA: TeamMemberData = {
  Sid: -1,
  Cid: -1,
  levelGap: 100,
  level: 1,
  totsu: 0,
  tensei: 0,
  statType: 'Free',
};

export const DEFAULT_STAT: stat = {
  dp: 0,
  hp: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  spirit: 0,
  witness: 0,
  luck: 0,
};

export const DEFAULT_STATMOD = {
  global: DEFAULT_STAT,
  styleP: DEFAULT_STAT,
  styleC: DEFAULT_STAT,
  limitBreak: DEFAULT_STAT,
  tensei: DEFAULT_STAT,
  booster: DEFAULT_STAT,
  chips: [DEFAULT_STAT, DEFAULT_STAT, DEFAULT_STAT, DEFAULT_STAT],
  accessories: DEFAULT_STAT,
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
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
  {
    id: '-1',
    name: 'None',
    slot: 0,
    chips: [
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
      {name: ' ', id: '-1'},
    ],
  },
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

export const RARITY = ['A', 'S', 'SS'];

export const SKILL_TARGET = [
  'N/A',
  '単体',
  '全体',
  '味方前衛',
  '味方全体',
  '味方単体',
  '味方後衛',
];

export const ELEMENT = ['無', '火', '氷', '雷', '光', '闇'];

export const WEAPON = ['無', '斬', '突', '打'];

export const CLASS = [
  '31A',
  '31B',
  '31C',
  '31D',
  '31E',
  '31F',
  '31X',
  '30G',
  '31AB!',
];

export const ROLE = [
  'Attacker',
  'Breaker',
  'Blaster',
  'Buffer',
  'Debuffer',
  'Defender',
  'Healer',
];

export const initialStyleData: styleData[] = [
  {
    Cid: '-1',
    name: 'dummpy name',
    chKey: '',
    Sid: -1,
    styleName: 'dummyStyleName',
    searchKey: 'dummy searchkey',
    SPusage: 0,
    hit: 0,
  },
];

export const styleImage = [...Array(999)].map(() => '');

export const DEFAULT_ACCESSORY_SET: accessory[] = [
  {type: 'ring', id: '', name: '', detail: '', stat: DEFAULT_STAT},
  {type: 'pierce', id: '', name: '', detail: '', stat: DEFAULT_STAT},
  {type: 'bracelet', id: '', name: '', detail: '', stat: DEFAULT_STAT},
  {type: 'chain', id: '', name: '', detail: '', stat: DEFAULT_STAT},
  {type: 'orb', id: '', name: '', detail: '', stat: DEFAULT_STAT},
  {type: 'soul', id: '', name: '', detail: '', stat: DEFAULT_STAT},
];

export const DEFAULT_TEAM_ACCESSORY: accessory[][] = [
  DEFAULT_ACCESSORY_SET,
  DEFAULT_ACCESSORY_SET,
  DEFAULT_ACCESSORY_SET,
  DEFAULT_ACCESSORY_SET,
  DEFAULT_ACCESSORY_SET,
  DEFAULT_ACCESSORY_SET,
];
