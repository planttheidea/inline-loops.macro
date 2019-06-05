for (let _key in object) {
  _value = object[_key];
  fn(_value, _key, object);
}
