exports.convertQueryStr = (obj) => {
  return Object.keys()
    .map((key) => `${key} = '${obj[key]}'`)
    .join();
};
