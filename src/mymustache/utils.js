function lookup(dataObj, keyName) {
  if (keyName == '.') {
    return dataObj
  }
  if (!keyName.includes('.')) {
    return dataObj[keyName]
  }
  const keyArray = keyName.split('.')
  let result = dataObj
  for (let key of keyArray) {
    result = result[key]
  }
  return result
}


export { lookup }