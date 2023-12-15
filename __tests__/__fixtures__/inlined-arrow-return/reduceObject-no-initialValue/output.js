let _hasInitialValue = false;
let _value;
let _result;
for (let _key in object) {
  if (_hasInitialValue) {
    _value = object[_key];
    _result = _result + _value;
  } else {
    _hasInitialValue = true;
    _result = object[_key];
  }
}
const sum = _result;