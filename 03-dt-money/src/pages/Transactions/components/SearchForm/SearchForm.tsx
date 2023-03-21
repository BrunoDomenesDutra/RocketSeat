import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const { register, handleSubmit } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransacations(data: SearchFormInputs) {
        console.log(`Dados quando tu preenche e clica em buscar: ${JSON.stringify(data)}`)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransacations)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    );
}