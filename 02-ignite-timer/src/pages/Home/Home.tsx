import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { StopCountdownButton, StartCountdownButton, HomeContainer } from './styles';

import { NewCycleForm } from './NewCycleForm/NewCycleForm';
import { Countdown } from './Countdown/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CycleContext } from '../../context/NewCycleContext';



/*  aqui estamos definindo um formato/Schema que o formulário utilizará como base
        para validação de dados. Similar a um schema de banco de dados que definimos para
        usar com ORMs como o PRISMA */
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'), // validando string que tenho no minimo 1 caractere
    minutesAmount: zod.number().min(5, 'Minimo 5min').max(60, 'Maximo 60min'), // validando um number, min 5 min e max de 60min
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // O Zod está extraindo a tipagem do formulário a partir do Schema acima



export function Home() {

const { createNewCycle, interrupeCurrentCycle, activeCycle} = useContext(CycleContext)

    /* 'register' etc, são funções do useForm. O 'register' é um metodo que adiciona um input ao formulario.
     o register indica quais campos estarão no formulário */
    const newCycleForm = useForm<NewCycleFormData>({ // useForm é como se estivesse criando um novo formulário na aplicação
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })


    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const watchTask = watch('task')
    const isSubmitDisabled = !watchTask


    return (
        <HomeContainer>
            {/* Você passa uma função dentro da função que vem do useForm, neste caso da handleSubmit */}
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>


                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />




                {activeCycle ? (
                    <StopCountdownButton onClick={interrupeCurrentCycle} type='button'>
                        <HandPalm size={24} />
                        Parar
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}

            </form>
        </HomeContainer>
    )
}