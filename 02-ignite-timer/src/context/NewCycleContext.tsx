import { differenceInSeconds } from "date-fns";
import { createContext, useEffect, useReducer, useState } from "react";
import { ActionType, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/actions";
import { cyclesReducer, iCycles } from "../reducers/reducer";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
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

interface CyclesState {
    cycles: iCycles[];
    activeCycleId: string | null;
}


/* Fazendo o 'as CyclesContextType' para que em outros componentes saibamos o que podemos usar */
export const CycleContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite_timer:cycles-state-1.0.0',)

            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }

            return initialState
        }
    )

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)



    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate),
            )
        }

        return 0
    }) /* Para armazenar quantos segundas se passaram desde que o ciclo foi iniciado */

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite_timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])






    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
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

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function interrupeCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
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