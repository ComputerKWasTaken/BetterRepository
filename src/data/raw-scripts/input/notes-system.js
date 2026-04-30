// Input Modifier

const modifier = (text) => {
  state.notes = state.notes || []

  if (text.match(/> You note:/i)) {
    const note = text.replace(/> You note: ?/i, '').trim()
    state.notes.push({
      pattern: history.map(({text}) => text).join('').split("\\n").pop(),
      note,
      actionCount: info.actionCount,
    })
    state.message = `Noted: ${note}`
    text = ''
  } else {
    delete state.message
  }

  return {text}
}

// Don't modify this part
modifier(text)
