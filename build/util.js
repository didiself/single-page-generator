import glob from 'glob';

export function getPathFiles(path, suffix) {
  return glob.sync(`${path}/**.${suffix}`);
}
