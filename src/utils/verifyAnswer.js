// Function to normalize a string (remove accents)
function normalizeString(str) {
  return str
    .normalize('NFD') // Normalize to NFD Unicode form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
}

// Function to split the celebrity name into parts inside and outside brackets
function splitCelebrityBrackets(celebrity) {
  // Split the celebrity name into parts inside and outside brackets
  return celebrity
    .split(/[()]/)
    .map((part) => part.trim()) // Trim whitespace from each part
    .filter((part) => part.length > 0) // Remove any empty strings
}

// Function to generate possible variations for names with "al-" or "ibn"
function generateNameVariations(nameParts) {
  let variations = new Set([...nameParts])

  // Handle input if "al-" is present
  nameParts.forEach((name) => {
    if (name.includes('al-')) {
      let modified = name.replace('al-', 'al ')
      let variationsArray = [
        modified,
        modified.replace('al ', ''),
        modified.replace('al ', '').replace('ibn', 'ibne'),
        modified.replace('al ', '').replace('ibn ', 'ibn-e-'),
        modified.replace('al ', '').replace('ibn ', 'ibn e '),
        modified.replace('al ', '').replace('ibn ', 'ibn-i-'),
        modified.replace('al ', '').replace('ibn ', 'ibn i '),
      ]
      variationsArray.forEach((variant) => variations.add(variant))
    }

    // Handle input if only "ibn" is present
    if (name.includes('ibn') && !name.includes('al-')) {
      let variationsArray = [
        name.replace('ibn', 'ibne'),
        name.replace('ibn', 'ibn-e-').replace(' ', ''),
        name.replace('ibn', 'ibn e'),
        name.replace('ibn', 'ibn-i-').replace(' ', ''),
        name.replace('ibn', 'ibn i'),
      ]
      variationsArray.forEach((variant) => variations.add(variant))
    }
  })
  return Array.from(variations)
}

// Function to generate possible variations for names with Roman numerals
function generateRomanNumeralVariations(nameParts) {
  let variations = new Set([...nameParts])

  nameParts.forEach((name) => {
    if (name.includes(' i')) {
      let modified = name.replace(' i', ' 1')
      let variationsArray = [modified, name.replace(' i', '')]
      variationsArray.forEach((variant) => variations.add(variant))
    }
    if (name.includes(' ii')) {
      let modified = name.replace(' ii', ' 2')
      let variationsArray = [modified, name.replace(' ii', ' the second')]
      variationsArray.forEach((variant) => variations.add(variant))
    }
  })
  return Array.from(variations)
}

// Function to generate possible variations for "Jr." to "Junior"
function generateJuniorVariations(nameParts) {
  let variations = new Set([...nameParts])

  nameParts.forEach((name) => {
    if (name.includes(' jr.')) {
      let modified = name.replace(' jr.', ' junior')
      variations.add(modified)
    }
  })
  return Array.from(variations)
}

// Function to generate possible variations for initials with or without periods
function generateInitialsVariations(nameParts) {
  let variations = new Set([...nameParts])

  // Handle input like "A. B. Name" (with space) and "A.B. Name" (without space)
  nameParts.forEach((name) => {
    if (/\b[a-z]\.\s*[a-z]\./i.test(name) || /\b[a-z]\.[a-z]\./i.test(name)) {
      let spacedInitials = name.replace(/\b([a-z])\.(?=[a-z])/gi, '$1. ') // A. B. Name
      let noSpaceBetweenInitials = name.replace(/\b([a-z])\.\s*([a-z])\./g, '$1.$2.') // A.B. Name
      let noPeriods = name.replace(/\./g, '') // A B Name for "A. B. Name"
      let compactInitialsWithSpace = spacedInitials.replace(/\./g, '') // A B Name for "A.B. Name"
      let compactInitials = noSpaceBetweenInitials.replace(/\./g, '') // AB Name
      variations.add(spacedInitials)
      variations.add(noSpaceBetweenInitials)
      variations.add(noPeriods)
      variations.add(compactInitialsWithSpace)
      variations.add(compactInitials)
    }
  })
  return Array.from(variations)
}

export function verifyAnswer(question, celebrity) {
  const userInput = normalizeString(question)
  const celebrityName = normalizeString(celebrity)

  const celebrityNameParts = splitCelebrityBrackets(celebrityName)

  const allVariations = [
    ...generateNameVariations(celebrityNameParts),
    ...generateRomanNumeralVariations(celebrityNameParts),
    ...generateJuniorVariations(celebrityNameParts),
    ...generateInitialsVariations(celebrityNameParts),
  ]

  // Check if the user input matches any part of the celebrity name
  //   return allVariations.some((part) => userInput === part)
  return allVariations.some((part) => userInput.includes(part))
}
