import { Play } from 'phosphor-react';
import { useState } from 'react';
import { StartCountdownButton, CountDownContainer, FormContainer, HomeContainer, Separator, MinutesAmountInput, TaskInput } from './styles';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

// aqui estamos definindo um formato/Schema que o formulário utilizará como base
// para validação de dados. Similar a um schema de banco de dados que definimos para
// usar com ORMs como o PRISMA
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'), // validando string que tenho no minimo 1 caractere
    minutesAmount: zod.number().min(5, 'Minimo 5min').max(60, 'Maximo 60min') // validando um number, min 5 min e max de 60min
})

interface iCycle {
    id: string;
    task: string;
    minutesAmount: number;
}

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {


    const [cycles, setCycles] = useState<iCycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    


    const { register, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })


    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(`Isso é o data: ${data}`)
        const newCycle: iCycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)

        reset()
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    console.log(activeCycle)
    

    const watchTask = watch('task')
    const isSubmitDisabled = !watchTask


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
                <FormContainer>
                    <label htmlFor='task'>Vou trabalhar em</label>
                    <TaskInput
                        id='task'
                        placeholder='De um nome para seu projeto'
                        {...register('task')}
                    />



                    <label htmlFor='minutesAmount'>durante</label>
                    <MinutesAmountInput
                        type='number'
                        id='minutesAmount'
                        placeholder='00'
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})} // o 'valueAsnumber' serve para passar o minutesAmount como um 'number' dentro do data
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}