let _value;
let _result = 0;
for (let _key in object) {
  _value = object[_key];
  _result = _result + _value;
}
const sum = _result;