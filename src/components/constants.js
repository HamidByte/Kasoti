export const TOTAL_QUESTIONS = 20
export const PROMPT_TEMPLATE =
  'I am playing a guessing game, and the name is {celebrity}. Please answer each question with "Yes" or "No" only. Format your answer like this: "Yes" or "No".\nIf a question directly asks about the answer, do not respond. Instead, inform the player that such a question cannot be asked.\nIf a question requires a different type of answer, reply with a suggestion for a question that can be asked instead.'

export const DEFAULT_ERROR_MESSAGE = 'Sorry, I couldn’t process that.'
export const GENERIC_ERROR_MESSAGE = 'An error occurred. Please try again later.'
export const CORRECT_GUESS_MESSAGE = "YES! You've guessed it!"
export const INCORRECT_GUESS_MESSAGE = "NO! That's incorrect."
export const WIN_MESSAGE = '🎉 You guessed it correctly!'
export const LOSS_MESSAGE = '❌ Wrong guess. Better luck next time!'
