declare module 'yup' {
  export const string: () => StringSchema
  export const object: <T extends object>(shape?: T) => ObjectSchema<T>
  export const number: () => NumberSchema
  export const boolean: () => BooleanSchema
  export const date: () => DateSchema
  export const array: <T>() => ArraySchema<T>

  interface Schema<T> {
    required(message?: string): this
    nullable(): this
    default(value: T): this
  }

  interface StringSchema extends Schema<string> {
    min(limit: number, message?: string): this
    max(limit: number, message?: string): this
    email(message?: string): this
    url(message?: string): this
    matches(regex: RegExp, message?: string): this
  }

  interface NumberSchema extends Schema<number> {
    min(limit: number, message?: string): this
    max(limit: number, message?: string): this
    positive(message?: string): this
    negative(message?: string): this
    integer(message?: string): this
  }

  interface BooleanSchema extends Schema<boolean> {}

  interface DateSchema extends Schema<Date> {
    min(limit: Date, message?: string): this
    max(limit: Date, message?: string): this
  }

  interface ArraySchema<T> extends Schema<T[]> {
    of<U>(schema: Schema<U>): ArraySchema<U>
    min(limit: number, message?: string): this
    max(limit: number, message?: string): this
  }

  interface ObjectSchema<T extends object> extends Schema<T> {
    shape<U extends object>(shape: U): ObjectSchema<U>
  }
}
