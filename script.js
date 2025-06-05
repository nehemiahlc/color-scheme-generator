const colorPicker = document.getElementById('color-picker')
const lightDarkModeBtn = document.getElementById('modeBtn')
const colorSchemeBtn = document.getElementById('btn-colors')
const colorTypeInput = document.getElementById('color-type')
const colorLabels = document.getElementById('color-hexes')
const colorsContainers = document.getElementById('colors-container')

let chosenColorArray = []


lightDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
   }
)

colorSchemeBtn.addEventListener('click', () => handleClick())

colorLabels.addEventListener('click', e => {
        const value = e.target.closest('[id]')
        navigator.clipboard.writeText(value.textContent)
        alert('Copied the text: ' + value.textContent)
})

colorsContainers.addEventListener('click', e => {
    const value = e.target.closest('[id]')
    navigator.clipboard.writeText(value.textContent)
    alert('Copied the text: ' + value.textContent)
})

colorsContainers.addEventListener('mouseover', (e) => {
    const colorDiv = e.target.closest('.color')

    if (colorDiv) {
        colorDiv.style.filter = 'brightness(1.2)'
    }
})

colorsContainers.addEventListener('mouseout', (e) => {
    const colorDiv = e.target.closest('.color')

    if (colorDiv) {
        colorDiv.style.filter = 'brightness(1)'
    }
})


function handleClick() {
    const color = colorPicker.value
    const mode = colorTypeInput.value
    fetchData(color, mode)
}




function fetchData(color, mode) {

    colorLabels.innerHTML = ''
    colorsContainers.innerHTML = ''
    chosenColorArray = []
    
    let chosenColor = color.slice(1)
    let chosenMode = mode.toLowerCase()
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${chosenMode}`)
        .then(res => res.json())
        .then(data => {
          
            for (let i = 0; i < data.colors.length; i++){
              
                chosenColorArray.push(data.colors[i].hex.value)

            }
            let id = 0
            chosenColorArray.map(color => {
                id++

                let newDiv = document.createElement('div')
                let textDiv = document.createElement('div')

                newDiv.style.backgroundColor = color
                newDiv.classList.add('color')
                // newDiv.textContent = color
                textDiv.textContent = color
                textDiv.classList.add('hover-text')
                newDiv.id = id
                newDiv.appendChild(textDiv)
                document.getElementById('colors-container').appendChild(newDiv)
            })
            
        
        })  


}

  