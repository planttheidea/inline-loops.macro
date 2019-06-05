let _result = true;

for (let _key in object) {
  _value = object[_key];

  if (!fn(_value, _key, object)) {
    _result = false;
    break;
  }
}

const areAllEven = _result;
