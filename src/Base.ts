import Provider, {Action, Options} from '@/providers/Provider';
import Cast from '@/casts/Cast';
import Errors from '@/Errors';

export default abstract class Base<A> {
    /**
     * An object that contains attributes.
     */
    attributes: A;

    /**
     * Indicates the create action is in progress.
     */
    creating = false;

    /**
     * Indicates the delete action is in progress.
     */
    deleting = false;

    /**
     * Indicates an error happened during an action.
     */
    error = false;

    /**
     * The errors that happened during an action.
     */
    errors: Errors = new Errors();

    /**
     * Indicates the fetch action is in progress.
     */
    fetching = false;

    /**
     * Indicates unknown action is in progress.
     */
    loading = false;

    /**
     * The provider that is used to execute actions.
     */
    provider?: Provider;

    /**
     * Indicates either the create or update action is in progress.
     */
    saving = false;

    /**
     * Indicates an action finished successfully.
     */
    success = false;

    /**
     * Indicates the update action is in progress.
     */
    updating = false;

    /**
     * A base class that helps managing models and collections.
     */
    constructor(attributes: Partial<A> = {}) {
        this.attributes = {} as A;

        const defaultedAttributes = {
            ...this.getDefaults(),
            ...attributes || {},
        };

        this.fillAttributes(defaultedAttributes);
    }

    /**
     * Calls the provider with the specified action.
     */
    async callProvider(action: Action, options?: Options): Promise<any> {
        if (!this.provider) {
            return undefined;
        }

        this.loading = true;
        this.error = false;
        this.success = false;

        let result;

        try {
            result = await this.provider[action](this, options);

            this.success = true;
        } catch (e) {
            this.error = true;

            throw e;
        } finally {
            this.loading = false;
        }

        return result;
    }

    /**
     * Clears error and success states
     */
    clearState(): void {
        this.error = false;

        this.errors = new Errors();

        this.success = false;
    }

    /**
     * Creates the model.
     */
    async create(options?: Options): Promise<any> {
        this.creating = true;

        let result;

        try {
            result = await this.save('create', options);
        } finally {
            this.creating = false;
        }

        return result;
    }

    /**
     * Deletes the model.
     */
    async delete(options?: Options): Promise<void> {
        this.deleting = true;

        try {
            await this.callProvider('delete', options);
        } finally {
            this.deleting = false;
        }
    }

    /**
     * Fetches the model.
     */
    async fetch(options?: Options): Promise<any> {
        this.fetching = true;

        let result;

        try {
            result = await this.callProvider('fetch', options);
        } finally {
            this.fetching = false;
        }

        this.onFetchSuccess(result);

        return result;
    }

    abstract fill(...filling: any[]): void;

    /**
     * Fills the attributes.
     */
    fillAttributes(attributes: Partial<A>): void {
        const entries = Object.entries(attributes);

        for (const entry of entries) {
            this.set(entry[0] as keyof A, entry[1] as A[keyof A]);
        }
    }

    /**
     * Returns the value of the attribute.
     */
    getAttribute<K extends keyof A>(key: K): A[K] {
        return this.attributes[key];
    }

    /**
     * Returns the default values for the attributes.
     */
    getDefaults(): A {
        return {} as A;
    }

    /**
     * Returns the cast for the given attribute.
     */
    getCast(key: keyof A): Cast | undefined {
        const casts = this.getCasts();

        if (key in casts) {
            return casts[key];
        }

        return undefined;
    }

    /**
     * Get the casted value of the given value
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getCasted<K extends keyof A>(key: K, value: any): A[K] {
        let attributeValue = value;

        const cast = this.getCast(key);

        if (cast) {
            attributeValue = cast.cast(attributeValue);
        }

        return attributeValue;
    }

    /**
     * Returns an object with casting definitions for each property of this
     * model.
     */
    getCasts(): Partial<Record<keyof A, Cast>> {
        return {};
    }

    /**
     * Called when the fetch request finished successfully.
     */
    onFetchSuccess(result: Record<string, any>): void {
        this.fill(result);
    }

    /**
     * Registers the attribute
     */
    registerAttribute<K extends keyof A>(key: K): void {
        Object.defineProperty(
            this,
            key,
            {
                get: (): A[K] => this.getAttribute(key),
                set: (value: A[K]): void => this.setAttribute(key, value),
            },
        );
    }

    /**
     * Sets the value of an attribute while registering it and casting the
     * value.
     */
    set<K extends keyof A>(key: K, value: any): void {
        if (!(key in this.attributes)) {
            this.registerAttribute(key);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Type 'K' cannot be used to index type 'this'.
        this[key] = this.getCasted(key, value);
    }

    /**
     * Sets the value of an attribute.
     */
    setAttribute<K extends keyof A>(key: K, value: A[K]): void {
        this.attributes[key] = value;
    }

    /**
     * Saves the model.
     */
    async save(action: 'create' | 'update', options?: Options): Promise<any> {
        this.saving = true;

        let result;

        try {
            result = await this.callProvider(action, options);
        } finally {
            this.saving = false;
        }

        if (result) {
            this.fill(result);
        }

        return result;
    }

    /**
     * Updates the model.
     */
    async update(options?: Options): Promise<any> {
        this.updating = true;

        let result;

        try {
            result = await this.save('update', options);
        } finally {
            this.updating = false;
        }

        return result;
    }
}
