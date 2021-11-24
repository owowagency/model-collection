export type Action = 'create' | 'delete' | 'fetch' | 'update';

export type Options = Record<string, unknown>;

interface Provider {
    /**
     * Creates the model.
     */
    create(model: unknown, options?: Options): Promise<unknown>;

    /**
     * Deletes the model.
     */
    delete(model: unknown, options?: Options): Promise<unknown>;

    /**
     * Fetches the model.
     */
    fetch(model: unknown, options?: Options): Promise<unknown>;

    /**
     * Updates the model.
     */
    update(model: unknown, options?: Options): Promise<unknown>;
}

export default Provider;
