interface Transaction {
    id: string,
    from: string,
    to: string,
    amount: number,
    createdAt: string
}

export default Transaction;