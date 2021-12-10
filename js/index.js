mobileNavigation()
slidePresenters()
hiddenPanelSections()
handleFormSubmit()


function mobileNavigation(){
    const navToggleBtn = document.querySelector(".nav-toggle")
    const header = document.getElementById("header")
    let navOpen = false

    navToggleBtn.addEventListener("click",()=>{
        navOpen=!navOpen
        header.classList.toggle("nav-open")
    })
}

function slidePresenters(){
    const arrowLeft = document.querySelector(".left")
    const arrowRight = document.querySelector(".right")
    const presentersList = document.querySelectorAll(".presenter")
    let current = 0
    
    arrowLeft.addEventListener("click",()=>{
        if(current===0){
            presentersList[current].classList.add("mobile-hidden")
            current=presentersList.length-1
            presentersList[current].classList.remove("mobile-hidden")
        }
        else{
            current--
            presentersList[current+1].classList.add("mobile-hidden")
            presentersList[current].classList.remove("mobile-hidden")
        }
    })

    arrowRight.addEventListener("click",()=>{
        if(current < presentersList.length-1){
            presentersList[current].classList.add("mobile-hidden")
            current++
            presentersList[current].classList.remove("mobile-hidden")
        }
        else{
            presentersList[current].classList.add("mobile-hidden")
            current = 0
            presentersList[current].classList.remove("mobile-hidden")
        }
    })
}


function hiddenPanelSections(){
    const panelLinks = document.querySelectorAll(".panel")
    const mainSection = document.getElementById("hidden-panel")
    const hiddenPanels = document.querySelectorAll(".panel-content")
    const slideLeft = document.querySelector(".panel-left")
    const slideRight = document.querySelector(".panel-right")
    const btnClose = document.querySelector(".btn-close")
    btnClose.addEventListener("click",()=>mainSection.style.display="none")
    let currentId = 0
    panelLinks.forEach(item=>item.addEventListener("click",(e)=>{
        e.preventDefault()
        if(window.innerWidth<=840){
            /* Spin arrow on mobile */
            item.classList.toggle("open-panel")
            panelLinks.forEach(item=>{
                if(!item.classList.contains("open-panel")){
                    if(document.querySelectorAll(".open-panel").length===0){
                        item.style.display="flex"
                        mainSection.style.display="none"
                    }
                    else{
                        item.style.display="none"
                        mainSection.style.display="block"
                    } 
                }
            })
        }
        else{

            mainSection.style.display="block"
            panelLinks.forEach(item=>item.style.display="flex")
            item.classList.remove("open-panel")
        }
        
        hiddenPanels.forEach(item=>item.style.display="none")
        document.querySelector("."+item.getAttribute("id")).style.display="flex"
        currentId = item.getAttribute("id").charAt(item.getAttribute("id").length-1)
        const articles = document.querySelectorAll(".article-"+currentId)
        articles.forEach(item=>{
            item.style.display="none"
        })
        articles[0].style.display="block"


        let currentArticle = 0
        slideRight.addEventListener("click",()=>{
            if(currentArticle<articles.length-1){
                articles[currentArticle].style.display="none"
                currentArticle++
                articles[currentArticle].style.display="block"
            }
            else{
                articles[currentArticle].style.display="none"
                currentArticle=0
                articles[currentArticle].style.display="block"
            }

        })
        slideLeft.addEventListener("click",()=>{
            if(currentArticle===0){
                articles[currentArticle].style.display="none"
                currentArticle=articles.length-1
                articles[currentArticle].style.display="block"
            }
            else{
                currentArticle--
                articles[currentArticle+1].style.display="none"
                articles[currentArticle].style.display="block"
            }
        })
        const infoText = [
            "Duis leo lorem, mattis at tellus quis, ullamcorper eleifend neque.",
            "Egestas mattis sapien odio in ligula.",
            "Sodales dictum, lectus nulla lobortis.",
            "Donec hendrerit, velit quis sodales.",
            "Mauris egestas mattis sapien odio in.",
            "Fagestas mattis sapien odio in ligula.",
            "Nullam sit amet justo eget nisi.",
            "Eectus nulla lobortis mauris, egestas."
        ]
        const panelInfoBar = document.querySelector(".panel-info-title")
        panelInfoBar.textContent=infoText[currentId-1]
        
    }))

    
}



function handleFormSubmit(){
    const submit = document.getElementById("register-form")
    const guest = document.getElementById("guest")
    const plusOne = document.querySelector(".plus-one")
    const checkbox = document.getElementById("acceptPrivacy")
    let openGuest = false
    let checked = false
    let error = false
    
    checkbox.addEventListener("change",()=>{
        checked=!checked
        if(checked && checkbox.classList.contains("required")){
            checkbox.parentElement.removeChild(checkbox.parentElement.childNodes[0])
            checkbox.classList.remove("required")
            error = false
        }
    })

    guest.addEventListener("change",(e)=>{
        if(e.target.value==="Yes"){
            plusOne.style.display="grid"
            openGuest = true
        }
        else{
            plusOne.style.display="none"
            openGuest = false
        }
    })

    submit.addEventListener("submit",(e)=>{
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(submit).entries())
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          } 
        Object.entries(formData).forEach(item=>{
            /* Remove error message if user corrects input */
            document.getElementById(item[0]).addEventListener("input",input=>{
                input.target.classList.remove("required")
                const exist = input.target.parentElement.childNodes[0]
                if(exist.className==="error-message"){
                    input.target.parentElement.removeChild(input.target.parentElement.childNodes[0])
                }
            })

            /* Add error message for all input except Guest, Job Title and Company */
            if(item[0]!=="plusOneTitle" && item[0]!=="plusOneFirstName" && item[0]!=="plusOneLastName" && item[0]!=="jobTitle" && item[0]!=="company"){
                if(!item[1]){
                    if(!document.getElementById(item[0]).classList.contains("required")){
                        submit.classList.add("error")
                        document.getElementById(item[0]).classList.add("required")
                        addErrorField("This filed is required.", item[0])
                    }
                    error = true
                }
                else if(item[0]==="email"){
                    if(!validateEmail(item[1])){
                        if(!document.getElementById(item[0]).classList.contains("required")){
                            submit.classList.add("error")
                            document.getElementById(item[0]).classList.add("required")
                            addErrorField("Please enter a valid email address.", item[0])
                        }
                        error = true
                    }
                }
                else if(item[0]==="tel"){
                    const firstChar = item[1][0]
                    const telNumber = Number(item[1].substring(1))
                    if(firstChar!=="+" && firstChar!=="0" || !Number(telNumber) || item[1].length<10){
                        if(!document.getElementById(item[0]).classList.contains("required")){
                            submit.classList.add("error")
                            document.getElementById(item[0]).classList.add("required")
                            addErrorField("Please use the following format: \"+44...\" or \"0\"", item[0])
                        }
                        error = true
                    }
                }
            }
            if(openGuest){
                if(item[0]==="plusOneTitle" || item[0]==="plusOneFirstName" || item[0]==="plusOneLastName"){
                    
                    if(!item[1]){
                        error = true
                        if(!document.getElementById(item[0]).classList.contains("required")){
                            submit.classList.add("error")
                            document.getElementById(item[0]).classList.add("required")
                            addErrorField("This filed is required.", item[0])
                        }
                    }
                    else{
                        error = false
                    }
                }
            }
            document.getElementById("register-form").scrollIntoView()
        })

        if(!checked){
            if(!checkbox.classList.contains("required")){
                checkbox.classList.add("required")
                addErrorField("Please accept Privacy Policy", "acceptPrivacy")
            }
            error = true
        }

        if(!error){
            alert("Thank you for your registration!")
            location.reload()
        }
    })
}

function addErrorField(message, location) {
    const labelNode = document.getElementById(location).parentElement
    const theFirstChild = labelNode.firstChild
    const newElement = document.createElement("p")
    const newContent = document.createTextNode(message)
    newElement.classList.add("error-message")
    newElement.appendChild(newContent)
    labelNode.insertBefore(newElement, theFirstChild)
}