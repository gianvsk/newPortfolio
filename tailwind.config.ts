import animation from './configs/tailwind/animation';
import fontFamily from './configs/tailwind/fontFamily';
import screens from './configs/tailwind/screens';
import { join } from 'path';

const resolve = (p: string) => join(__dirname, p);

export default {
  content: [
    resolve('storyblok/**/*.vue'),
    resolve('~/components/**/*.vue'),
    resolve('~/layouts/**/*.vue'),
    resolve('~/pages/**/*.vue'),
  ],
  theme: {
    extend: {
      fontFamily,
      animation,
      screens,
    },
  },
  plugins: [],
};

