import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcomeFlow.js'

export default createFlow([
    welcomeFlow,
]);
