for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];
  fn(_value, _key, array);
}
