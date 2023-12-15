let _determination = false,
  _value,
  _result;
for (const _key in object) {
  _value = object[_key];
  _result = _value % 2 === 0;
  if (_result) {
    _determination = true;
    break;
  }
}
const areAnyEven = _determination;