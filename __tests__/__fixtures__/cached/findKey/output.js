let _match = -1,
  _value,
  _result;
for (const _key in object) {
  _value = object[_key];
  _result = fn(_value, _key, object);
  if (_result) {
    _match = _key;
    break;
  }
}
const firstEven = _match;