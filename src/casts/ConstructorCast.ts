import Cast from '@/casts/Cast';

export default class ConstructorCast<T, V> implements Cast<T, V> {
    /**
     * The constructor that is used to cast a value to.
     */
    Constructor: new (args: unknown) => T;

    /**
     * Casts a value to a constructor.
     */
    constructor(Constructor: new (args: unknown) => T) {
        this.Constructor = Constructor;
    }

    /**
     * Casts the value.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cast(value: V): T {
        if (value instanceof this.Constructor) {
            return value;
        }

        return new this.Constructor(value);
    }
}
