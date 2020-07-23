// Now that you are expected to handle unexpected (user) input...
// you don't need to specify the different types this function expects.
//
// `unknown` tells the TS compiler not to assume anything about the input
export const stringify = (input: unknown): string => {
  if (input === Infinity) throw new Error("💩");
  if (typeof input === "bigint") throw new Error("💩");
  if (
    input instanceof Date ||
    input instanceof Map ||
    input instanceof Set ||
    input instanceof RegExp ||
    input instanceof Function
  ) throw new Error("💩");

  if (input === null) return '\"null\"';
  if (typeof input === "undefined") return '\"undefined\"';

  if (
    typeof input === "boolean" ||
    typeof input === "number"
  ) return input.toString();

  if (typeof input === "string") {
    if (!input) return '""';
    input = input.replace(/\n/g, "\\n");
    return '\"' + input + '\"'
  }

  const res = []
  let openBracket: string, closeBracket: string;
  if (Array.isArray(input)) {
    for(const key in input) {
      res.push(stringify(input[key]));
    }
    openBracket = '['
    closeBracket = ']'
  } else { // is object
    for(const key in input) {
      res.push('\"' + key + '\"' + ':' + stringify(input[key]));
    }
    openBracket = '{'
    closeBracket = '}'
  }
    return openBracket + res.join(',') + closeBracket
};

// What is the difference between unknown and any?

// `unknown` is the type-safe counterpart of any. Anything is assignable to unknown, but unknown isn’t assignable to anything but itself and any without a type assertion or a control flow based narrowing. Operations on an unknown variable require you to assert or narrow down to a more specific type first.
// Unlike `any`, with `unknown`, you cannot access any properties on values with type `unknown`, as it will error.
// They are both a universal supertype, but you should use unknown to signal that the value can be anything and so type checking must be performed before it is used.


// What are Record, A and B in Record<A, B>?

// They are type variables. Using type variables allow us to capture the type the user provides so that we can use that information later. For example, if a user inputs A as a string and B as a number, later through the function if we created new variables `foo` of type A and `bar of type B, `foo` would be a string and `bar` would be a number.


// Can you give an example of a place where Generics would help the TypeScript type-checker (and therefore you)?

// In this function:
// function identity(arg: any): any {
//     return arg;
// }

// since the arg is type any and the return output is type any, they could be different. but say you wanted them to be the same -- the compiler wouldn't know

// so, you could use generics:

// function identity<T>(arg: T): T {
//     return arg;
// }

// now you can guarantee the input type and return type are actually the same.
