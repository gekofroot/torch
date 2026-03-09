
let header = document.getElementById('header')
let settingsPanel = document.getElementById('settings-panel')
let incrementR = document.getElementById('increment-r')
let decrementR = document.getElementById('decrement-r')
let incrementG = document.getElementById('increment-g')
let decrementG = document.getElementById('decrement-g')
let incrementB = document.getElementById('increment-b')
let decrementB = document.getElementById('decrement-b')
let vToggle = document.getElementById('v-toggle')
let incrementVignette = document.getElementById('increment-vignette')
let torchSwitch = document.getElementById('torch-switch')
let menu = document.getElementById('menu')
let areaShader = document.getElementById('area-shader')
let mainAreaVignette = document.getElementById('main-area-vignette')
let mainArea = document.getElementById('main-area')


let mainIndexR = 15
let mainIndexG = 15
let mainIndexB = 15
let mainIndices = [
  mainIndexR,
  mainIndexG,
  mainIndexB
]

let alphas = [
  'a', 'b', 
  'c', 'd', 
  'e', 'f'
]
let alphaIndexR = 5
let alphaIndexG = 5
let alphaIndexB = 5
alphaIndices = [
  alphaIndexR,
  alphaIndexG,
  alphaIndexB
]

let numerics = [
  0, 1, 2, 
  3, 4, 5, 
  6, 7, 8, 
  9
]
let numericIndexR = 9
let numericIndexG = 9
let numericIndexB = 9
numericIndices = [
  numericIndexR,
  numericIndexG,
  numericIndexB
]

let increments = [
  incrementR, 
  incrementG, 
  incrementB
]
let decrements = [
  decrementR, 
  decrementG, 
  decrementB
]

let torchIndexR = `${alphas[alphaIndexR]}${alphas[alphaIndexR]}`
let torchIndexG = `${alphas[alphaIndexG]}${alphas[alphaIndexG]}`
let torchIndexB = `${alphas[alphaIndexB]}${alphas[alphaIndexB]}`
let torchValue = `#${torchIndexR}${torchIndexG}${torchIndexB}`
torchIndices = [
  torchIndexR,
  torchIndexG,
  torchIndexB
]
mainArea.style.background = `${torchValue}`

// stored values
let storedMainIndexR = localStorage.getItem('stored-main-index-r')
let storedMainIndexG = localStorage.getItem('stored-main-index-g')
let storedMainIndexB = localStorage.getItem('stored-main-index-b')
let storedMainIndices = [
  'stored-main-index-r',
  'stored-main-index-g',
  'stored-main-index-b'
]
if (storedMainIndexR) {
  mainIndexR = storedMainIndexR
}
if (storedMainIndexG) {
  mainIndexG = storedMainIndexG
}
if (storedMainIndexB) {
  mainIndexB = storedMainIndexB
}

let storedAlphaIndexR = localStorage.getItem('stored-alpha-index-r')
let storedAlphaIndexG = localStorage.getItem('stored-alpha-index-g')
let storedAlphaIndexB = localStorage.getItem('stored-alpha-index-b')
let storedAlphaIndices = [
  'stored-alpa-index-r',
  'stored-alpa-index-g',
  'stored-alpa-index-b'
]
if (storedAlphaIndexR) {
  alphaIndexR = storedMainIndexR
}
if (storedAlphaIndexG) {
  alphaIndexG = storedMainIndexG
}
if (storedAlphaIndexB) {
  alphaIndexB = storedMainIndexB
}

let storedNumericIndexR = localStorage.getItem('stored-numeric-index-r')
let storedNumericIndexG = localStorage.getItem('stored-numeric-index-g')
let storedNumericIndexB = localStorage.getItem('stored-numeric-index-b')
let storedNumericIndices = [
  'stored-numeric-index-r',
  'stored-numeric-index-g',
  'stored-numeric-index-b'
]
if (storedNumericIndexR) {
  numericIndexR = storedNumericIndexR
}
if (storedNumericIndexG) {
  numericIndexG = storedNumericIndexG
}
if (storedNumericIndexB) {
  numericIndexB = storedNumericIndexB
}

let storedTorchIndexR = localStorage.getItem('stored-torch-index-r')
let storedTorchIndexG = localStorage.getItem('stored-torch-index-g')
let storedTorchIndexB = localStorage.getItem('stored-torch-index-b')
let storedTorchIndices = [
  'stored-torch-index-r',
  'stored-torch-index-g',
  'stored-torch-index-b'
]
if (storedTorchIndexR) {
  torchIndexR = storedTorchIndexR
}
if (storedTorchIndexG) {
  torchIndexG = storedTorchIndexG
}
if (storedTorchIndexB) {
  torchIndexB = storedTorchIndexB
}

let storedTorchValue = localStorage.getItem('stored-torch-value')
if (storedTorchValue) {
  mainArea.style.background = `${storedTorchValue}`
}

let storedVToggleValue = localStorage.getItem('stored-v-toggle')
if (storedVToggleValue) {
  storedVToggleValue = Number(storedVToggleValue)
  if (storedVToggleValue === 0) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--vignette-a))'
  } else if (storedVToggleValue === 1) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--vignette-b))'
  } else if (storedVToggleValue === 2) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--clr))'
  }
}

let shaderToggle = 0
torchSwitch.addEventListener('click', () => {
  if (shaderToggle === 0) {
    areaShader.style.opacity = `0`
    shaderToggle = 1
  } else  if (shaderToggle === 1) {
    areaShader.style.opacity = `100`
    shaderToggle = 0
  }
})

let menuToggle = 0
let intervalCount = 0
menu.addEventListener('click', () => {
  if (menuToggle === 0) {
    intervalCount = 0
    settingsPanel.style.display = 'grid'
    let menuInterval = setInterval(() => {
      if (intervalCount > 100) {
	clearInterval(menuInterval)
      } else {
	settingsPanel.style.height = `${intervalCount}%`
	intervalCount += 2
      }
    }, 10) 
    menuToggle = 1
  } else if (menuToggle === 1) {
    intervalCount = 100
    let menuInterval = setInterval(() => {
      if (intervalCount < 0) {
	settingsPanel.style.display = 'none'
	clearInterval(menuInterval)
      } else {
	settingsPanel.style.height = `${intervalCount}%`
	intervalCount -= 2
      }
    }, 10) 
    menuToggle = 0
  } 
})

settingsPanel.addEventListener('click', () => {
  let eventTarget = event.target
  if (decrements.includes(eventTarget)) {
    for (let x = 0; x < decrements.length; x++) {
      if (eventTarget.id === decrements[x].id) {
	if (mainIndices[x] >= 10) {
	  torchIndices[x] = `${alphas[alphaIndices[x]]}${alphas[alphaIndices[x]]}`
	  localStorage.setItem(storedTorchIndices[x], torchIndices[x])
	  if (alphaIndices[x] >= 0) {
	    alphaIndices[x] -= 1
	    mainIndices[x] -= 1
	    localStorage.setItem(storedAlphaIndices[x], alphaIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  } else {
	    alphaIndices[x] = 0
	    localStorage.setItem(storedAlphaIndices[x], alphaIndices[x])
	  }
	  if (x === 0) {
	    torchIndexR = torchIndices[x]
	  } else if (x === 1) { 
	    torchIndexG = torchIndices[x]
	  } else if (x === 2) {
	    torchIndexB = torchIndices[x]
	  }
	} else if (mainIndices[x] < 10) {
	  torchIndices[x] = `${numerics[numericIndices[x]]}${numerics[numericIndices[x]]}`
	  localStorage.setItem(storedTorchIndices[x], torchIndices[x])
	  if (numericIndices[x] > 0 && alphaIndices[x] === -1) {
	    numericIndices[x] -= 1
	    mainIndices[x] -= 1
	    localStorage.setItem(storedNumericIndices[x], numericIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  } else {
	    numericIndices[x] = 0
	    mainIndices[x] = 0
	    localStorage.setItem(storedNumericIndices[x], numericIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  }
	  if (x === 0) {
	    torchIndexR = torchIndices[x]
	  } else if (x === 1) { 
	    torchIndexG = torchIndices[x]
	  } else if (x === 2) {
	    torchIndexB = torchIndices[x]
	  }
	}
      }
    }
  } else if (increments.includes(eventTarget)) {
    for (let x = 0; x < increments.length; x++) {
      if (eventTarget.id === increments[x].id) {
	if (mainIndices[x] >= 9 && numericIndices[x] === 9) {
	  torchIndices[x] = `${alphas[alphaIndices[x]]}${alphas[alphaIndices[x]]}`
	  localStorage.setItem(storedTorchIndices[x], torchIndices[x])
	  if (alphaIndices[x] < 5) {
	    alphaIndices[x] += 1
	    mainIndices[x] += 1
	    localStorage.setItem(storedAlphaIndices[x], alphaIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  } else {
	    alphaIndices[x] = 5
	    mainIndices[x] = 15
	    localStorage.setItem(storedAlphaIndices[x], alphaIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  }
	  if (x === 0) {
	    torchIndexR = torchIndices[x]
	  } else if (x === 1) { 
	    torchIndexG = torchIndices[x]
	  } else if (x === 2) {
	    torchIndexB = torchIndices[x]
	  }
	} else if (mainIndices[x] < 9) {
	  torchIndices[x] = `${numerics[numericIndices[x]]}${numerics[numericIndices[x]]}`
	  localStorage.setItem(storedTorchIndices[x], torchIndices[x])
	  if (numericIndices[x] < 9) {
	    numericIndices[x] += 1
	    mainIndices[x] += 1
	    localStorage.setItem(storedNumericIndices[x], numericIndices[x])
	    localStorage.setItem(storedMainIndices[x], mainIndices[x])
	  } else {
	    numericIndices[x] = 10
	    localStorage.setItem(storedNumericIndices[x], numericIndices[x])
	  }
	  if (x === 0) {
	    torchIndexR = torchIndices[x]
	  } else if (x === 1) { 
	    torchIndexG = torchIndices[x]
	  } else if (x === 2) {
	    torchIndexB = torchIndices[x]
	  }
	}
      }
    }
  } 
  torchValue = `#${torchIndexR}${torchIndexG}${torchIndexB}`
  localStorage.setItem('stored-torch-value', torchValue)
  mainArea.style.background = `${torchValue}`
}) 

header.addEventListener('dblclick', () => {
  header.style.opacity = 0
})

header.addEventListener('click', () => {
  let eventTarget = event.target
  header.style.opacity = 100
  eventTarget.addEventListener('mouseover', () => {
    header.style.opacity = 100
  })
})

let vToggleValue = 0
vToggle.addEventListener('click', () => {
  localStorage.setItem('stored-v-toggle', vToggleValue)
  if (vToggleValue === 0) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--vignette-a))'
    vToggleValue = 1
  } else if (vToggleValue === 1) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--vignette-b))'
    vToggleValue = 2
  } else if (vToggleValue === 2) {
    mainAreaVignette.style.background = 'radial-gradient(var(--clr), var(--clr))'
    vToggleValue = 0
  }
})

