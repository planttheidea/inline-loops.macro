let _skip = false,
  _total = 0,
  _value;
for (const _key in object) {
  _value = object[_key];
  if (_skip) {
    _total = _value;
    _skip = false;
    continue;
  }
  _total = _total + _value;
}
const sum = _total;