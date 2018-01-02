export function initData(tpl, config) {
  const getTplData = (arr) => arr.reduce((obj, key) => {
    return key.content.reduce((o, child) => {
      return Object.assign(obj, { [key.value + '_' + child.value]: child.children ? [] : child.type === 'radio' ? false : '' });
    }, {});
  }, {});

  const getJourneyData = function (children) {
    return Object.keys(children).reduce((obj, item) => Object.assign(obj, { [item]: '' }), {});
  };

  const getConfigData = (obj) => Object.keys(obj).reduce((o, parent) => {
    return Object.assign(o, {
      [parent]: [Object.keys(obj[parent].content).reduce((oo, key) => {
        return Object.assign(oo, { [key]: key === 'journey' ? [getJourneyData(obj[parent].content[key].children)] : '' });
      }, {})]
    });
  }, {});

  return Object.assign(getTplData(tpl), getConfigData(config));
}
