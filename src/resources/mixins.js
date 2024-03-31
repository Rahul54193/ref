import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

// export const scaleFont = size => size * PixelRatio.getFontScale();
export const scaleFont = size => size;
function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

//DROP SHADOW FUNCTION
export function dropShadow(elevation, color = '#000') {
  const s = parseShadow(androidDepth.penumbra[elevation - 1]);
  const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5);
  const o = Number(interpolate(elevation - 1, 1, 24, 0.2, 0.6).toFixed(2));
  const r = Number(interpolate(s.blur, 1, 38, 1, 16).toFixed(2));
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: y,
    },
    shadowOpacity: o,
    shadowRadius: r,

    elevation: elevation,
  };
}

function interpolate(i, a, b, a2, b2) {
  return ((i - a) * (b2 - a2)) / (b - a) + a2;
}

function parseShadow(raw) {
  const values = raw.split(' ').map(val => +val.replace('px', ''));
  return {
    x: values[0],
    y: values[1],
    blur: values[2],
  };
}

const androidDepth = {
  penumbra: [
    '0px 1px 1px 0px',
    '0px 2px 2px 0px',
    '0px 3px 4px 0px',
    '0px 4px 5px 0px',
    '0px 5px 8px 0px',
    '0px 6px 10px 0px',
    '0px 7px 10px 1px',
    '0px 8px 10px 1px',
    '0px 9px 12px 1px',
    '0px 10px 14px 1px',
    '0px 11px 15px 1px',
    '0px 12px 17px 2px',
    '0px 13px 19px 2px',
    '0px 14px 21px 2px',
    '0px 15px 22px 2px',
    '0px 16px 24px 2px',
    '0px 17px 26px 2px',
    '0px 18px 28px 2px',
    '0px 19px 29px 2px',
    '0px 20px 31px 3px',
    '0px 21px 33px 3px',
    '0px 22px 35px 3px',
    '0px 23px 36px 3px',
    '0px 24px 38px 3px',
  ],
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
