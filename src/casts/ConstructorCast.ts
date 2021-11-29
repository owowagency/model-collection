import Cast from '@/casts/Cast';

export default class ConstructorCast implements Cast {
    /**
     * The constructor that is used to cast a value to.
     */
    Constructor: new (args: unknown) => any;

    /**
     * Casts a value to a constructor.
     */
    constructor(Constructor: new (args: unknown) => any) {
        this.Constructor = Constructor;
    }

    /**
     * Casts the value.
     */
    cast(value: any): any {
        if (value instanceof this.Constructor) {
            return value;
        }

        return new this.Constructor(value);
    }
}
