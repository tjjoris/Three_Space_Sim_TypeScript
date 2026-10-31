import { createContext } from "react";
import { getGameState } from "../../main";

const gameState = getGameState();
export const GameStateContext = createContext(gameState);
