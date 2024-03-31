import {scaleFont} from './mixins';
import * as SPACING from './spacing';
import * as COLORS from './colors';
import * as FONTS from './fonts';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans Regular';
export const FONT_FAMILY_BOLD = 'OpenSans Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_100 = scaleFont(100);
export const FONT_SIZE_99 = scaleFont(99);
export const FONT_SIZE_98 = scaleFont(98);
export const FONT_SIZE_97 = scaleFont(97);
export const FONT_SIZE_96 = scaleFont(96);
export const FONT_SIZE_95 = scaleFont(95);
export const FONT_SIZE_94 = scaleFont(94);
export const FONT_SIZE_93 = scaleFont(93);
export const FONT_SIZE_92 = scaleFont(92);
export const FONT_SIZE_91 = scaleFont(91);
export const FONT_SIZE_90 = scaleFont(90);
export const FONT_SIZE_89 = scaleFont(89);
export const FONT_SIZE_88 = scaleFont(88);
export const FONT_SIZE_87 = scaleFont(87);
export const FONT_SIZE_86 = scaleFont(86);
export const FONT_SIZE_85 = scaleFont(85);
export const FONT_SIZE_84 = scaleFont(84);
export const FONT_SIZE_83 = scaleFont(83);
export const FONT_SIZE_82 = scaleFont(82);
export const FONT_SIZE_81 = scaleFont(81);
export const FONT_SIZE_80 = scaleFont(80);
export const FONT_SIZE_79 = scaleFont(79);
export const FONT_SIZE_78 = scaleFont(78);
export const FONT_SIZE_77 = scaleFont(77);
export const FONT_SIZE_76 = scaleFont(76);
export const FONT_SIZE_75 = scaleFont(75);
export const FONT_SIZE_74 = scaleFont(74);
export const FONT_SIZE_73 = scaleFont(73);
export const FONT_SIZE_72 = scaleFont(72);
export const FONT_SIZE_71 = scaleFont(71);
export const FONT_SIZE_70 = scaleFont(70);
export const FONT_SIZE_69 = scaleFont(69);
export const FONT_SIZE_68 = scaleFont(68);
export const FONT_SIZE_67 = scaleFont(67);
export const FONT_SIZE_66 = scaleFont(66);
export const FONT_SIZE_65 = scaleFont(65);
export const FONT_SIZE_64 = scaleFont(64);
export const FONT_SIZE_63 = scaleFont(63);
export const FONT_SIZE_62 = scaleFont(62);
export const FONT_SIZE_61 = scaleFont(61);
export const FONT_SIZE_60 = scaleFont(60);
export const FONT_SIZE_59 = scaleFont(59);
export const FONT_SIZE_58 = scaleFont(58);
export const FONT_SIZE_57 = scaleFont(57);
export const FONT_SIZE_56 = scaleFont(56);
export const FONT_SIZE_55 = scaleFont(55);
export const FONT_SIZE_54 = scaleFont(54);
export const FONT_SIZE_53 = scaleFont(53);
export const FONT_SIZE_52 = scaleFont(52);
export const FONT_SIZE_51 = scaleFont(51);
export const FONT_SIZE_50 = scaleFont(50);
export const FONT_SIZE_49 = scaleFont(49);
export const FONT_SIZE_48 = scaleFont(48);
export const FONT_SIZE_47 = scaleFont(47);
export const FONT_SIZE_46 = scaleFont(46);
export const FONT_SIZE_45 = scaleFont(45);
export const FONT_SIZE_44 = scaleFont(44);
export const FONT_SIZE_43 = scaleFont(43);
export const FONT_SIZE_42 = scaleFont(42);
export const FONT_SIZE_41 = scaleFont(41);
export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_39 = scaleFont(39);
export const FONT_SIZE_38 = scaleFont(38);
export const FONT_SIZE_37 = scaleFont(37);
export const FONT_SIZE_36 = scaleFont(36);
export const FONT_SIZE_35 = scaleFont(35);
export const FONT_SIZE_34 = scaleFont(34);
export const FONT_SIZE_33 = scaleFont(33);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_31 = scaleFont(31);
export const FONT_SIZE_30 = scaleFont(30);
export const FONT_SIZE_29 = scaleFont(29);
export const FONT_SIZE_28 = scaleFont(28);
export const FONT_SIZE_27 = scaleFont(27);
export const FONT_SIZE_26 = scaleFont(26);
export const FONT_SIZE_25 = scaleFont(25);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_23 = scaleFont(23);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_21 = scaleFont(21);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_19 = scaleFont(19);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_17 = scaleFont(17);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_15 = scaleFont(15);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_13 = scaleFont(13);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_11 = scaleFont(11);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_9 = scaleFont(9);
export const FONT_SIZE_8 = scaleFont(8);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_22 = scaleFont(22);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);
export const LINE_HEIGHT_15 = scaleFont(15);

//DYNAMIC WIDTH IN PERCENT
export const DYNAMIC_WIDTH = width => {
  return width;
};

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const HEADER_TITLE = {
  fontFamily: FONTS.RubikLight,
  fontSize: FONT_SIZE_18,
  lineHeight: LINE_HEIGHT_22,
  textAlign: 'left',
  letterSpacing: 1,
  color: COLORS.WHITE,
};

export const BUTTON_TEXT = {
  fontSize: FONT_SIZE_20,
  color: COLORS.WHITE,
  textAlign: 'center',
  fontFamily: FONTS.RubikMedium,
};

export const FORM_TEXT = {
  fontFamily: FONTS.RubikLight,
  fontSize: FONT_SIZE_12,
  color: COLORS.LOGO_COLOR,
};

export const FORM_INPUT_TEXT = {
  fontFamily: FONTS.RubikLight,
  fontSize: FONT_SIZE_16,
  color: COLORS.PLACEHOLDER_COLOR,
  padding: 0,
  paddingVertical: SPACING.SCALE_6,
};

export const FLEX_DIRECTION_ROW = {
  flexDirection: 'row',
};

export const FLEX_ONE = {
  flex: 1,
};

export const JUSTIFY_ALIGN = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const ALIGN_ITEM_CENTER = {
  alignItems: 'center',
};

export const targetTitle = [
  {title: 'Below Target', color: COLORS.MY_PROFILE_TAB_COLOR},
  {title: 'On Target', color: COLORS.FAT_COLOR},
  {title: 'Above Target', color: COLORS.CARBS_COLOR},
];
