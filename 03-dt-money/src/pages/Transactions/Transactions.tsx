import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Summary } from "../../components/Summary/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/Formatter";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { TransactionsContainer, TransactionsTable, PriceHighlight } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome'
    category: string;
    price: number;
    createdAt: string;
}

export function Transactions() {

    const {transactions} = useContext(TransactionsContext)



    return (
        <div>
            <Header />
            < Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}