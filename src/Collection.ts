import Base from '@/Base';
import {Collection as BaseCollection} from 'collect.js';
import CollectJs from '@/CollectJs';

abstract class Collection<M, A> extends Base<A> {
    /**
     * The items of the collection.
     */
    items: M[];

    /**
     * A custom iterator that allows for looping over this instance.
     */
    [Symbol.iterator](): Iterator<M> {
        let index = -1;

        return {
            next: () => ({
                value: this.items[++index],
                done: !(index in this.items),
            }),
        };
    }

    /**
     * A class that helps managing collections of models.
     */
    constructor(items: any[] = [], attributes: Partial<A> = {}) {
        super(attributes);

        this.items = [];

        this.fill(items);
    }

    /**
     * Clears the collection of items.
     */
    clear(): void {
        this.items = [];
    }

    /**
     * Fills the items.
     */
    fill(items: any[]): void {
        const ModelClass = this.getModel();

        this.items = items
            .map((item: any) => {
                if (item instanceof ModelClass) {
                    return item;
                }

                return new ModelClass(item);
            });
    }

    /**
     * Returns the model this collection holds.
     */
    abstract getModel(): new (...args: any[]) => M;
}

// Merge collect.js with our collection.
interface Collection<M, A> extends CollectJs<M>, Base<A> {
    getDefaults(): A;
}

Object.getOwnPropertyNames(BaseCollection.prototype)
    .forEach((name: string) => {
        Object.defineProperty(
            Collection.prototype,
            name,
            Object.getOwnPropertyDescriptor(BaseCollection.prototype, name)
                || Object.create(null),
        );
    });

export default Collection;
