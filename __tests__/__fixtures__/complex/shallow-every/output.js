let _result = true;
for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  if (!(_value > 0)) {
    _result = false;
    break;
  }
}
if (_result) {
  console.log('I am positive!');
}