import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../context/NewCycleContext";


export function NewCycleForm() {

    const { activeCycle } = useContext(CycleContext)
    const { register, handleSubmit, watch, reset } = useFormContext()    


    return (

        <FormContainer>
            <label htmlFor='task'>Vou trabalhar em</label>
            <TaskInput
                id='task'
                placeholder='De um nome para seu projeto'
                disabled={!!activeCycle} // Os dois '!!' serve para verificar se o valor é nulo ou não. Ele transforma para boolean
                {...register('task')} // usamos o spread no 'register' para que ele retorne cada método em um atributo do input
            />



            <label htmlFor='minutesAmount'>durante</label>
            <MinutesAmountInput
                type='number'
                id='minutesAmount'
                placeholder='00'
                step={5}
                min={1}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true })} // o 'valueAsnumber' serve para passar o minutesAmount como um 'number' dentro do data
            />

            <span>minutos.</span>
        </FormContainer>

    )

}