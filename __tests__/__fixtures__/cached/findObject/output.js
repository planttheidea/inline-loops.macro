let _match, _value, _result;
for (const _key in object) {
  _value = object[_key];
  _result = fn(_value, _key, object);
  if (_result) {
    _match = _value;
    break;
  }
}
const firstEven = _match;