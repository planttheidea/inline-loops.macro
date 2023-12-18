let _total = array[array.length - 1];
for (let _key = array.length - 1, _value; --_key >= 1; ) {
  _value = array[_key];
  _total = _total + _value;
}
const sum = _total;