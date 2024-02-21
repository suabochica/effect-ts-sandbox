export class ISO<S, A> {
    private constructor(public view: (s: S) => A, public review: (a: A) => S) { }

    static make<S, A>(view: (s: S) => A, review: (a: A) => S): ISO<S, A> {
        return new ISO(view, review);
    }

    static id<A, S>() {
        return new ISO<A, S>(
            (x) => x as unknown as S,
            (x) => x as unknown as A,
        )
    }

    /**
     * Terse operator of through
     * Combine ISO<A, B> and ISO<B, C> to ISO<A, C>
     * @param other
     * @returns
     */
    ['>>']<B>(other: ISO<A, B>): ISO<S, B> {
        return this.through(other)
    }

    through<B>(other: ISO<A, B>): ISO<S, B> {
        return new ISO(
            (s: S) => other.view(this.view(s)),
            (b: B) => this.review(other.review(b)),
        )
    }
}