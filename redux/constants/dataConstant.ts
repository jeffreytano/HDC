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

export const INI_RARITY = {
  All: true,
  A: false,
  S: false,
  SS: false,
};

export const INI_SKILL_TARGET = {
  All: true,
  無: false,
  単体: false,
  全体: false,
  味方前衛: false,
  味方全体: false,
  味方単体: false,
  味方後衛: false,
};

export const INI_ELEMENT = {
  All: true,
  無: false,
  火: false,
  氷: false,
  雷: false,
  光: false,
  闇: false,
};

export const INI_WEAPON = {All: true, 斬: false, 突: false, 打: false};

export const INI_CLASS = {
  All: true,
  '31A': false,
  '31B': false,
  '31C': false,
  '31D': false,
  '31E': false,
  '31F': false,
  '31X': false,
  '30G': false,
  '31AB!': false,
};

export const INI_ROLE = {
  All: true,
  Attacker: false,
  Breaker: false,
  Blaster: false,
  Buffer: false,
  Debuffer: false,
  Defender: false,
  Healer: false,
};

export const INI_SELECTEDMODE = {
  All: true,
  以上: false,
  のみ: false,
  以下: false,
};
export const INI_DAMAGEBUFF = {
  エンハンス: false,
  ドーピング: false,
  属性エンハンス: false,
  クリティカル率: false,
  クリティカルダメージ: false,
  チャージ: false,
  属性フィールド小: false,
  属性フィールド: false,
  属性フィールド強: false,
  心眼: false,
  闘志: false,
  士気: false,
};
export const INI_DEFBUFF = {
  防御力上昇: false,
  SP回復: false,
  DP回復: false,
  DP復活: false,
  無敵: false,
  ウイルス回復: false,
  スキル回数回復: false,
  デバフ無効: false,
};
export const INI_DAMAGEDEBUFF = {
  防御力下降: false,
  属性防御力下降: false,
  脆弱: false,
  厄: false,
  耐性解除: false,
  バフ解除: false,
};
export const INI_DEFDEBUFF = {
  封印: false,
  スタン: false,
  混乱: false,
  攻撃力下降: false,
  敵の防御力上昇: false,
  麻痺: false,
};

export const initialStyleData: styleData[] = [
  {
    Cid: '-1',
    name: 'dummpy name',
    class: '31A',
    rarity: 'SS',
    element: 0,
    weapon: 0,
    role: 'Attacker',
    target: 0,
    chKey: '',
    Sid: -1,
    styleName: 'dummyStyleName',
    searchKey: 'dummy searchkey',
    SPusage: 0,
    SPequal: 0,
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
