import { ActionType } from "./actions";
import { produce } from "immer";


interface CyclesState {
    cycles: iCycles[];
    activeCycleId: string | null;
}

export interface iCycles {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;

}



export function cyclesReducer(state: CyclesState, action: any) {

    switch (action.type) {
        case ActionType.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        case ActionType.INTERRUPT_CURRENT_CYCLE: {

            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
            })
        }
        case ActionType.MARK_CURRENT_CYCLE_AS_FINISHED: {

            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }
        default:
            return state
    }
}