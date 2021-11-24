import Base from '@//Base';
import {Options} from '@//providers/Provider';
import cloneDeep from 'lodash.clonedeep';

type Attributes = Record<string|number|symbol, any>;

export default abstract class Model<A extends Attributes> extends Base<A> {
    /**
     * An object that contains original values.
     */
    original: A;

    /**
     * @inheritdoc
     */
    primaryKey: keyof A = 'id';

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
}
