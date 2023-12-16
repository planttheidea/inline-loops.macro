type Dictionary<Type> = {
  [key: string]: Type;
  [index: number]: Type;
};

/**
 * collections
 */
type ArrayCollection<Item> = Item[];
type ObjectCollection<Item> = Dictionary<Item>;

/**
 * the handlers for the collections, specific to type
 */
type ArrayHandler<Item, Result> = (
  value: Item,
  index: number,
  array: ArrayCollection,
) => Result;
type ObjectHandler<Item, Result> = (
  value: Item,
  key: string,
  object: ObjectCollection,
) => Result;

type Every = typeof Array.prototype.findIndex;

/**
 * available exports
 */

declare function every<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): boolean;
declare function everyObject<Item>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, unknown>,
): boolean;
declare function everyRight<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): boolean;

declare function filter<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item>,
): ArrayCollection<Item, unknown>;
declare function filterObject<Item>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, unknown>,
): ObjectCollection<Item>;
declare function filterRight<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): ArrayCollection<Item>;

declare function find<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): Item | undefined;
declare function findObject<Item>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, unknown>,
): Item | undefined;
declare function findLast(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): Item | undefined;

declare function findIndex<Item, Collection extends ArrayCollection<Item>>(
  collection: Collection,
  handler: ArrayHandler<Item, unknown>,
): keyof Collection | -1;
declare function findKey<Item, Collection extends ObjectCollection<Item>>(
  collection: Collection,
  handler: ObjectHandler<Item, unknown>,
): keyof Collection | void;
declare function findLastIndex<Item, Collection extends ObjectCollection<Item>>(
  collection: Collection,
  handler: ArrayHandler<Item, unknown>,
): keyof Collection | -1;

declare function forEach<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, void>,
): void;
declare function forEachObject<Item>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, void>,
): void;
declare function forEachRight<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, void>,
): void;

declare function map<Item, Result>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, Result>,
): ArrayCollection<Result>;
declare function mapObject<Item, Result>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, Result>,
): ObjectCollection<Result>;
declare function mapRight<Item, Result>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, Result>,
): ArrayCollection<Result>;

type ArrayReduceHandler<Item, Result> = (
  accumulator?: Result,
  value?: Item,
  index?: number,
  array?: ArrayCollection,
) => Result;
type ObjectReduceHandler = (
  accumulator?: Result,
  value?: Item,
  key?: string,
  object?: ObjectCollection,
) => Result;

declare function reduce<Item, Result>(
  collection: ArrayCollection<Item>,
  handler: ArrayReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;
declare function reduceObject<Item, Result>(
  collection: ObjectCollection<Item>,
  handler: ObjectReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;
declare function reduceRight<Item, Result>(
  collection: ArrayCollection<Item>,
  handler: ArrayReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;

declare function some<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): boolean;
declare function someObject<Item>(
  collection: ObjectCollection<Item>,
  handler: ObjectHandler<Item, unknown>,
): boolean;
declare function someRight<Item>(
  collection: ArrayCollection<Item>,
  handler: ArrayHandler<Item, unknown>,
): boolean;

export {
  every,
  everyObject,
  everyRight,
  filter,
  filterObject,
  filterRight,
  find,
  findIndex,
  findLastIndex,
  findKey,
  findObject,
  findLast,
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
