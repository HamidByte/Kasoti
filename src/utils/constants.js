export const TOTAL_QUESTIONS = 20
export const AI_PROMPT = `I am playing a guessing game where the correct answer is '{celebrity}'.
These are the rules to follow before answering the questions.\n
1. Respond each question with 'Yes', 'No' or 'Correct' only. Format output like this: Yes, No or Correct.\n
2. If user guesses the correct answer, respond with 'Correct'. If the user guesses incorrectly, respond with 'No'.\n
3. If a question directly asks for the answer, e.g. 'What is he name of the person?', kindly inform the player that such questions cannot be asked.\n
4. Ignore small mistakes like spelling errors, incorrect pronouns, etc.\n
5. If the question cannot be answered with 'Yes', 'No' or 'Correct', then provide the user with an example question along short instructions without revealing the correct answer. Instruction can be like the question should always be in a format that allows for a 'Yes' or 'No' answer\n\n`

export const PLAYER_PROMPT = `I am playing a guessing game where I will guess a famous personality and you have to guess the name by asking Yes/No questions.\n
These are the rules to follow before asking the questions.\n
1. You cannot ask the direct name of the person.\n
2. You can only ask questions that can be answered with 'Yes' or 'No'. For example 'Is the person male?', 'Is the person alive?', 'Is the person from Europe?' or 'Is the person a singer?'.\n
3. Tip for you: Ask questions that will help you eliminate the most options. For example gender, location, profession, age, and notable achievements, etc.\n
4. If you guessed the name, write the name.\n
5. Do not repeat the same question. Look at the questions and answers list.\n
I've thought of a famous personality now, can you guess it?.\n`

export const DEFAULT_ERROR_MESSAGE = 'Sorry, I couldn’t process that.'
export const GENERIC_ERROR_MESSAGE = 'An error occurred. Please try again later.'
export const WIN_MESSAGE = '🎉 You guessed it correctly!'
export const LOSS_MESSAGE = '❌ You are unable to guess the celebrity name, better luck next time!'

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
