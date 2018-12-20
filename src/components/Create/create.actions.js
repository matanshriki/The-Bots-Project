export const CREATE_BOT = 'CREATE_BOT'

export const createBot = (bot) => ({
    type: CREATE_BOT,
    payload: bot
})