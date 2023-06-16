import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import actionsReducer from './actionsReducer';
import attackerGlobalReducer from './attackerGlobalReducer';
import attackerReducer from './attackerReducer';
import blockerReducer from './blockerReducer';
import coupReducer from './coupReducer';
import descartCardReducer from './descartCardReducer';
import gameReducer from './gameReducer';
import gamesReducer from './gamesReducer';
import resultReducer from './resultReducer';
import userReducer from './userReducer'
import variableReducer from './variableReducer';

const rootReducer = combineReducers({
    action: actionsReducer,
    user: userReducer,
    game: gameReducer,
    games: gamesReducer,
    attacker: attackerReducer,
    attackerGlobal: attackerGlobalReducer,
    blocker: blockerReducer,
    variables: variableReducer,
    result: resultReducer,
    descart: descartCardReducer,
    coup: coupReducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: []
})

export default store
