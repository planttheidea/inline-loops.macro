import React from 'react';
function List(props) {
  return /*#__PURE__*/ React.createElement(
    'ul',
    null,
    (() => {
      const _collection = props.items;
      const _length = _collection.length;
      const _results = Array(_length);
      for (let _key = 0, _item; _key < _length; ++_key) {
        _item = _collection[_key];
        _results[_key] = /*#__PURE__*/ React.createElement(
          'li',
          {
            key: _item.id,
          },
          _item.value,
        );
      }
      return _results;
    })(),
  );
}