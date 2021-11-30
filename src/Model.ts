import Base from '@/Base';
import {Options} from '@/providers/Provider';
import cloneDeep from 'lodash.clonedeep';

export type Attributes = Record<string|number|symbol, any>;

export default abstract class Model<A extends Attributes> extends Base<A> {
    /**
     * An object that contains original values.
     */
    original: A;

    /**
     * @inheritdoc
     */
    primaryKey: keyof A = 'id';

    /**
     * A class that contains data of a model.
     */
    constructor(attributes: Partial<A> = {}) {
        super(attributes);

        this.original = {} as A;

        this.syncOriginal();
    }

    /**
     * @inheritDoc
     */
    async fetch(options?: Options): Promise<any> {
        const result = await super.fetch(options);

        this.syncOriginal();

        return result;
    }

    /**
     * Fills the model with attributes.
     */
    fill(attributes: Partial<A>): void {
        this.fillAttributes(attributes);
    }

    /**
     * Returns the value of the identifier.
     */
    getIdentifier(): any {
        return this.attributes[this.primaryKey];
    }

    /**
     * Returns the data used during the create and update actions.
     */
    getSaveData(): any {
        return this.attributes;
    }

    /**
     * @inheritDoc
     */
    async save(action: 'create' | 'update', options?: Options): Promise<any> {
        const result = await super.save(action, options);

        this.syncOriginal();

        return result;
    }

    /**
     * Copies attributes to original
     */
    syncOriginal(): void {
        this.original = cloneDeep(this.attributes);
    }

    /**
     * Returns the json representation of the model.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON(): any {
        return this.attributes;
    }
}
