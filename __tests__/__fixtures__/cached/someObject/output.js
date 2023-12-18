let _determination = false,
  _value,
  _result;
for (const _key in object) {
  _value = object[_key];
  _result = fn(_value, _key, object);
  if (_result) {
    _determination = true;
    break;
  }
}
const areAnyEven = _determination;