interface ErrorBag {
    [key: string]: string[];
}

export default class Errors {
    /**
     * The errors.
     */
    errors: ErrorBag = {};

    /**
     * A custom iterator that allows for looping over this instance.
     */
    [Symbol.iterator](): Iterator<[string, string[]]> {
        let index = -1;

        const errors = Object.entries(this.errors);

        return {
            next: () => ({
                value: errors[++index],
                done: !(index in errors),
            }),
        };
    }

    /**
     * A wrapper for an object that contains errors.
     */
    constructor() {
        /*
         * Use a proxy to access the error bag directly. The following
         * statements are equal: `errors.name`, and `errors.errors.name`.
         */
        // TODO Figure out why this Proxy is not reactive. (PIFRO-193)
        return new Proxy(this, {
            get(target: Errors, prop: string): any {
                const error = prop in target
                    // @ts-ignore
                    ? target[prop]
                    : target.errors[prop];

                return error && Array.isArray(error)
                    ? error[0]
                    : error;
            },
        });
    }

    /**
     * Sets the errors property.
     */
    setErrors(errors: ErrorBag): this {
        this.errors = errors;

        return this;
    }
}
