export const TOTAL_QUESTIONS = 20
export const QUESTION_PROMPT = `I am playing a guessing game where the correct answer is '{celebrity}'. 
These are the rules to follow before answering the questions.\n
1. Respond each question with 'Yes', 'No' or 'Correct' only. Format output like this: Yes, No or Correct.\n
2. If user guesses the correct answer, respond with 'Correct'. If the user guesses incorrectly, respond with 'No'.\n
3. If a question directly asks for the answer, e.g. 'What is he name of the person?', kindly inform the player that such questions cannot be asked.\n
4. Ignore small mistakes like spelling errors, incorrect pronouns, etc.\n
5. If the question cannot be answered with 'Yes', 'No' or 'Correct', then provide the user with an example question along short instructions without revealing the correct answer. Instruction can be like the question should always be in a format that allows for a 'Yes' or 'No' answer\n\n
`

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
