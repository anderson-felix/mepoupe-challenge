import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.NODE_ENV?.toLowerCase() === 'production' ? 's3' : 'disk',
  directory: tmpFolder,
};
