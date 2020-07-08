module.exports.getCSSModuleLocalIdent = () => {
  return process.env.NODE_ENV === 'development' ? '[path][name]__[local]' : '[local]--[hash:base64:5]';
}