import { createMacro } from 'babel-plugin-macros';
import type { MacroParams } from 'babel-plugin-macros';
import { createHandlers } from './handlers';

function inlineLoopsMacro({ references, babel }: MacroParams) {
  const {
    every = [],
    everyObject = [],
    everyRight = [],
    filter = [],
    filterObject = [],
    filterRight = [],
    find = [],
    findObject = [],
    findLast = [],
    findIndex = [],
    findKey = [],
    findLastIndex = [],
    flatMap = [],
    flatMapRight = [],
    forEach = [],
    forEachObject = [],
    forEachRight = [],
    map = [],
    mapObject = [],
    mapRight = [],
    reduce = [],
    reduceObject = [],
    reduceRight = [],
    some = [],
    someObject = [],
    someRight = [],
  } = references;

  const handlers = createHandlers(babel);

  every.forEach(handlers.every);
  everyObject.forEach(handlers.everyObject);
  everyRight.forEach(handlers.everyRight);

  filter.forEach(handlers.filter);
  filterObject.forEach(handlers.filterObject);
  filterRight.forEach(handlers.filterRight);

  forEach.forEach(handlers.forEach);
  forEachObject.forEach(handlers.forEachObject);
  forEachRight.forEach(handlers.forEachRight);

  find.forEach(handlers.find);
  findObject.forEach(handlers.findObject);
  findLast.forEach(handlers.findLast);

  findIndex.forEach(handlers.findIndex);
  findKey.forEach(handlers.findKey);
  findLastIndex.forEach(handlers.findLastIndex);

  flatMap.forEach(handlers.flatMap);
  flatMapRight.forEach(handlers.flatMapRight);

  map.forEach(handlers.map);
  mapObject.forEach(handlers.mapObject);
  mapRight.forEach(handlers.mapRight);

  reduce.forEach(handlers.reduce);
  reduceObject.forEach(handlers.reduceObject);
  reduceRight.forEach(handlers.reduceRight);

  some.forEach(handlers.some);
  someObject.forEach(handlers.someObject);
  someRight.forEach(handlers.someRight);
}

export default createMacro(inlineLoopsMacro);
