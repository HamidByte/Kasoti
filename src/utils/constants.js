export const TOTAL_QUESTIONS = 20
export const PROMPT_TEMPLATE = `I am playing a guessing game, and the name is {celebrity}. These are the rules to follow before answering the questions.\n1. Please answer each question with "Yes" or "No" only. Format your answer like this: 'Yes' or 'No'.\n2. If the question cannot be answered with a simple 'Yes' or 'No', then provide the user with an example question along short instructions that question should always be in a format that allows for a 'Yes' or 'No' answer.\n3. If a question directly asks for the answer, kindly inform the player that such questions cannot be asked.\n\n`

export const DEFAULT_ERROR_MESSAGE = 'Sorry, I couldn’t process that.'
export const GENERIC_ERROR_MESSAGE = 'An error occurred. Please try again later.'
export const CORRECT_GUESS_MESSAGE = "YES! You've guessed it!"
export const INCORRECT_GUESS_MESSAGE = "NO! That's incorrect."
export const WIN_MESSAGE = '🎉 You guessed it correctly!'
export const LOSS_MESSAGE = '❌ Wrong guess. Better luck next time!'

export const REGIONS = [
  { display: 'Worldwide', value: 'ww' },
  { display: 'United States', value: 'us' },
  { display: 'North America', value: 'na' },
  { display: 'South America', value: 'sa' },
  { display: 'Europe', value: 'eu' },
  { display: 'Asia', value: 'as' },
  { display: 'Middle East', value: 'me' },
  { display: 'Subcontinent', value: 'sc' },
  { display: 'Africa', value: 'af' },
]
