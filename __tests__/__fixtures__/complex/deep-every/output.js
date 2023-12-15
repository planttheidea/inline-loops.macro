let _result = true;
for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  if (!(_value > 0)) {
    _result = false;
    break;
  }
}
let _result2 = true;
for (
  let _key2 = 0, _length2 = array.length, _value2;
  _key2 < _length2;
  ++_key2
) {
  _value2 = array[_key2];
  if (!(_value2 === ~~_value2)) {
    _result2 = false;
    break;
  }
}
if (`${_result}|${_result2}` === 'true|true') {
  console.log('I am positive and an integer!');
}