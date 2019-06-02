export function escapeHTML(str: string) {
  var escapeChars = {
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    "'": '#39',
  };
  return str.replace(
    new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'mg'),
    function(match) {
      return '&' + escapeChars[match] + ';';
    },
  );
}

export function unescapeHTML(str: string) {
  var htmlEntities = {
    nbsp: ' ',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    '#39': "'",
  };
  return str.replace(/\&([^;]+);/gm, function(match, key) {
    if (key in htmlEntities) {
      return htmlEntities[key];
    }
    return match;
  });
}
