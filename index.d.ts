type Dictionary<Type> = {
  [key: string]: Type;
  [index: number]: Type;
};

/**
 * iterables
 */
type ArrayIterable<Type extends any = any> = Type[];
type ObjectIterable<Type extends any = any> = Dictionary<Type>;

/**
 * the handlers for the iterables, specific to type
 */
type ArrayHandler<Type extends any = any> = (
  value: Type,
  index: number,
  array: ArrayIterable<Type>,
) => any;
type ObjectHandler<Type extends any = any> = (
  value: Type,
  key: string,
  object: ObjectIterable<Type>,
) => any;

/**
 * available exports
 */

declare function every<Type>(iterable: ArrayIterable<Type>, handler: ArrayHandler<Type>): boolean;
declare function everyObject<Type>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): boolean;
declare function everyRight<Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): boolean;

declare function filter<Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): ArrayIterable<Type>;
declare function filterObject<Type>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): ObjectIterable<Type>;
declare function filterRight<Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): ArrayIterable<Type>;

declare function find<Type extends any = any>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): Type | undefined;
declare function findObject<Type extends any = any>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): Type | undefined;
declare function findRight<Type extends any = any>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): Type | undefined;

declare function findIndex<Type, Iterable extends ArrayIterable<Type> = ArrayIterable<Type>>(
  iterable: Iterable,
  handler: ArrayHandler<Type>,
): keyof Iterable | -1;
declare function findIndexRight<Type, Iterable extends ArrayIterable<Type> = ArrayIterable<Type>>(
  iterable: Iterable,
  handler: ArrayHandler<Type>,
): keyof Iterable | -1;
declare function findKey<Type, Iterable extends ObjectIterable<Type> = ObjectIterable<Type>>(
  iterable: Iterable,
  handler: ObjectHandler<Type>,
): keyof Iterable | void;

declare function forEach<Type>(iterable: ArrayIterable<Type>, handler: ArrayHandler<Type>): void;
declare function forEachObject<Type>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): void;
declare function forEachRight<Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): void;

declare function map<Type extends any = any, NewType extends any = Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): ArrayIterable<NewType>;
declare function mapObject<Type extends any = any, NewType extends any = Type>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): ObjectIterable<NewType>;
declare function mapRight<Type extends any = any, NewType extends any = Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
): ArrayIterable<NewType>;

type ArrayReduceHandler<Type extends any = any, Result extends any = any> = (
  result: Result,
  value: Type,
  index: number,
  array: ArrayIterable<Type>,
) => Result;
type ObjectReduceHandler<Type extends any = any, Result extends any = any> = (
  accumulator: Result,
  value: Type,
  key: string,
  object: ObjectIterable<Type>,
) => Result;

declare function reduce<Type, Result extends any = any, InitialValue extends any = any>(
  iterable: ArrayIterable<Type>,
  handler: ArrayReduceHandler<Type, Result>,
  initialValue?: InitialValue,
): Result;
declare function reduceObject<Type, Result extends any = any, InitialValue extends any = any>(
  iterable: ObjectIterable<Type>,
  handler: ObjectReduceHandler<Type, Result>,
  initialValue?: InitialValue,
): Result;
declare function reduceRight<Type, Result extends any = any, InitialValue extends any = any>(
  iterable: ArrayIterable<Type>,
  handler: ArrayReduceHandler<Type, Result>,
  initialValue?: InitialValue,
): Result;

declare function some<Type>(iterable: ArrayIterable<Type>, handler: ArrayHandler<Type>): boolean;
declare function someObject<Type>(
  iterable: ObjectIterable<Type>,
  handler: ObjectHandler<Type>,
): boolean;
declare function someRight<Type>(
  iterable: ArrayIterable<Type>,
  handler: ArrayHandler<Type>,
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
