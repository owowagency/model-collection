interface Cast<T, V = unknown> {
    /**
     * Casts the value.
     */
    cast(value: V): T;
}

export default Cast;
