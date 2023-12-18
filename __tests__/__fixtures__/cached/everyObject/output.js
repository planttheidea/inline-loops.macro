let _determination = true,
  _value,
  _result;
for (const _key in object) {
  _value = object[_key];
  _result = fn(_value, _key, object);
  if (!_result) {
    _determination = false;
    break;
  }
}
const areAllEven = _determination;