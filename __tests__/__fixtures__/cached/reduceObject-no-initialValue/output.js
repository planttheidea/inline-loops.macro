let _hasInitialValue = false;

let _result;

for (let _key in object) {
  if (_hasInitialValue) {
    _value = object[_key];
    _result = fn(_result, _value, _key, object);
  } else {
    _hasInitialValue = true;
    _result = object[_key];
  }
}

const doubledValues = _result;
