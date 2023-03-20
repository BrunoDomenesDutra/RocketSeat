import { createContext, useReducer, useState } from "react";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface iCycles {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;

}


interface CyclesContextType {
    cycles: iCycles[];
    activeCycle: iCycles | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interrupeCurrentCycle: () => void;

}


/* Fazendo o 'as CyclesContextType' para que em outros componentes saibamos o que podemos usar */
export const CycleContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export function CycleContextProvider({children}: CyclesContextProviderProps) {

    const [cycles, dispatch] = useReducer((state: iCycles[], action: any) => {
        return state
    }, [])




    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) /* Para armazenar quantos segundas se passaram desde que o ciclo foi iniciado */

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


    function markCurrentCycleAsFinished() {
        setCycles(
            (state) =>
                state.map((cycle) => {
                    if (cycle.id === activeCycleId) {
                        return { ...cycle, finishedDate: new Date() }
                    } else {
                        return cycle
                    }
                }),
        )
    }

    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {

        const newCycle: iCycles = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),

        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        //reset()

    }

    function interrupeCurrentCycle() {

        setCycles(
            (state) => state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date(),
                    }
                } else {
                    return cycle
                }
            }),
        )

        setActiveCycleId(null)

    }


    return (
        <CycleContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondPassed,
            createNewCycle,
            interrupeCurrentCycle
        }}>
            {children}
        </CycleContext.Provider>
    )
}