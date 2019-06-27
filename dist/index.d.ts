type Dictionary<Type> = {
  [key: string]: Type;
  [index: number]: Type;
};

/**
 * iterables
 */
type ArrayIterable = any[];
type ObjectIterable = Dictionary<any>;

/**
 * the handlers for the iterables, specific to type
 */
type ArrayHandler = (value: any, index: number, array: ArrayIterable) => any;
type ObjectHandler = (value: any, key: string, object: ObjectIterable) => any;

/**
 * available exports
 */

declare function every(iterable: ArrayIterable, handler: ArrayHandler): boolean;
declare function everyObject(iterable: ObjectIterable, handler: ObjectHandler): boolean;
declare function everyRight(iterable: ArrayIterable, handler: ArrayHandler): boolean;

declare function filter<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): Iterable;
declare function filterObject<Iterable = ObjectIterable>(
  iterable: ObjectIterable,
  handler: ObjectHandler,
): Iterable;
declare function filterRight<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): Iterable;

declare function find(iterable: ArrayIterable, handler: ArrayHandler): any;
declare function findObject(iterable: ObjectIterable, handler: ObjectHandler): any;
declare function findRight(iterable: ArrayIterable, handler: ArrayHandler): any;

declare function findIndex<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): keyof Iterable | -1;
declare function findIndexRight<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): keyof Iterable | -1;

declare function findKey<Iterable = ObjectIterable>(
  iterable: Iterable,
  handler: ObjectHandler,
): keyof Iterable | void;

declare function forEach(iterable: ArrayIterable, handler: ArrayHandler): void;
declare function forEachObject(iterable: ObjectIterable, handler: ObjectHandler): void;
declare function forEachRight(iterable: ArrayIterable, handler: ArrayHandler): void;

declare function map(iterable: ArrayIterable, handler: ArrayHandler): ArrayIterable;
declare function mapObject(iterable: ObjectIterable, handler: ObjectHandler): ObjectIterable;
declare function mapRight(iterable: ArrayIterable, handler: ArrayHandler): ArrayIterable;

type ArrayReduceHandler = (
  accumulator?: any,
  value?: any,
  index?: number,
  array?: ArrayIterable,
) => any;
type ObjectReduceHandler = (
  accumulator?: any,
  value?: any,
  key?: string,
  object?: ObjectIterable,
) => any;

declare function reduce(
  iterable: ArrayIterable,
  handler: ArrayReduceHandler,
  initialValue?: any,
): any;
declare function reduceObject(
  iterable: ObjectIterable,
  handler: ObjectReduceHandler,
  initialValue?: any,
): any;
declare function reduceRight(
  iterable: ArrayIterable,
  handler: ArrayReduceHandler,
  initialValue?: any,
): any;

declare function some(iterable: ArrayIterable, handler: ArrayHandler): boolean;
declare function someObject(iterable: ObjectIterable, handler: ObjectHandler): boolean;
declare function someRight(iterable: ArrayIterable, handler: ArrayHandler): boolean;

export {
  every,
  everyObject,
  everyRight,
  filter,
  filterObject,
  filterRight,
  find,
  findIndex,
  findIndexRight,
  findKey,
  findObject,
  findRight,
  forEach,
  forEachObject,
  forEachRight,
  map,
  mapObject,
  mapRight,
  reduce,
  reduceObject,
  reduceRight,
  some,
  someObject,
  someRight,
};
