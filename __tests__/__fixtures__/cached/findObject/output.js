let _result;

for (let _key in object) {
  _value = object[_key];

  if (fn(_value, _key, object)) {
    _result = _value;
    break;
  }
}

const firstEven = _result;
