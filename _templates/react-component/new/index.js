const tokensData = require("@ramsey-design-system/tokens/package.json");

module.exports = {
  params: () => {
    return { rdsTokensVersion: `${tokensData.version}` };
  },
};
