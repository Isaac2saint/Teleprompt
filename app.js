const scripttbn = document.getElementById('scriptbtn');
const telepromptbtn = document.getElementById('telepromptbtn');
const container = document.getElementById('container');
const scriptarea = document.getElementById('scriptarea');


let toggle = 'script';
let script = '';
let WPM = 160;
let fontSize = 20;
let highlight = true;
let highlightColor = '#563d7c';
let timing = 'evenly';
let running = false;
let fromStart = true;



scripttbn.addEventListener('click', () => {
    if (toggle == 'teleprompt') {
        toggle = 'script';
        
        scripttbn.classList.add('active');
        telepromptbtn.classList.remove('active');
        container.innerHTML = `<div class="row">
        <div class="col-12">
            <h1>SCRIPT</h1>
            <textarea id="scriptarea" class="form-control" rows="10"></textarea>
        </div>
    </div>`;
    document.getElementById('scriptarea').value = script;
    }
});

telepromptbtn.addEventListener('click', () => {
    if (toggle == 'script') {
        script = document.getElementById('scriptarea').value;
        console.log(script);
        toggle = 'teleprompt';
        telepromptbtn.classList.add('active');
        scripttbn.classList.remove('active');
        container.innerHTML = `<div class="row">
        <div class="col-12">
            <h1>TELEPROMPT</h1>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text" id="wpm-span">WPM</span>
                    <input type="text" class="form-control" id="wpm-input" placeholder="Number" aria-label="words per minute" aria-describedby="basic-addon1">
                </div>
            </div>
           
           
        </div>
        <div class="col-6">
            <div id="font-size" class="input-group">
                <span class="input-group-text" id="fontsize-span">Font Size</span>
                <input type="text" class="form-control" id="fontSize-input" placeholder="Number" aria-label="Username" aria-describedby="basic-addon1">
            </div>
        </div>

        <div class="col-8">
            
       
    </div>
            <!-- <div cl
            ass="col-6">
            <hr class="vertical-line">
        </div> -->
            <div id="telepromptarea" class="form-control telepromptarea" contenteditable=False readonly></div>
        </div>

        <div>
            <button type="button" id="full-screen" class="btn btn-primary">Full Screen</button>
        </div>

        <div id="start-stop-restart" style="position: absolute; cursor: move;">
        <button id="start" type="button" class="btn btn-success">Start</button>
        <button id="pause" type="button" class="btn btn-warning">Pause</button>
    <button id="stop" type="button" class="btn btn-danger">Stop</button>
   
</div>
    </div>`;
    }

//     <div id="highlight-color" class="col-4">
//     <div class="input-group">
//         <span class="input-group-text" id="hc-span">Highlight-Colour</span>
//         <input type="color" class="form-control form-control-color" id="highlightColorPicker" value="#563d7c" title="Choose your color">
//     </div>
// </div>

// {/* <div id="highlightdiv" class="col-4">
// <div class="input-group">
//     <span class="input-group-text" id="highlight-span">Highlight</span>
//     <input class="form-check-input" type="checkbox" value="" id="highlightBox">
// </div>
// </div> */}

// {/* <div id="timingtoggle" class="btn-group" role="group" aria-label="Basic radio toggle button group">
// <input type="radio" class="btn-check" name="btnradio" id="evenlyradio" autocomplete="off" checked>
// <label class="btn btn-outline-primary" for="evenlyradio">Evenly Spaced</label>

// <input type="radio" class="btn-check" name="btnradio" id="syllableradio" autocomplete="off">
// <label class="btn btn-outline-primary" for="syllableradio">Syllable Adjustment</label>

// </div> */}

    const telepromptarea = document.getElementById("telepromptarea");

    // set and update words per minute
    wpmInput = document.getElementById("wpm-input");
    wpmInput.value = WPM;
    wpmInput.addEventListener('change', () =>{
        wpmInput = document.getElementById("wpm-input")
        WPM = wpmInput.value;
        console.log(WPM)
        if (running){
            startTeleprompter();
        }
    })



    // set and update the font size
    fontSizeInput = document.getElementById("fontSize-input");
    fontSizeInput.value = fontSize + "px";
    telepromptarea.style.fontSize = fontSize + 'px';
    // Remove 'px' when the input field is focused
    fontSizeInput.addEventListener('focus', () => {
        fontSizeInput.value = fontSizeInput.value.replace('px', '');
    });

    fontSizeInput.addEventListener('change', () =>{
        fontSize = fontSizeInput.value;
        console.log(fontSize);
        telepromptarea.style.fontSize = fontSize + 'px';
        if (running){
         startTeleprompter();
        }
    })

    // Add 'px' back when the input field loses focus
    fontSizeInput.addEventListener('blur', () => {
        if (!fontSizeInput.value.endsWith('px')) {
            fontSizeInput.value += 'px';
        }

    });

    // set and update the highlight colour

    // highlightColorPicker = document.getElementById('highlightColorPicker');
    // highlightColorPicker.value = highlightColor;
    // highlightColorPicker.addEventListener('change', () => {
    //     highlightColor = highlightColorPicker.value;
    //     console.log(highlightColor);
    // }
    // )

    // set and update the highlight toggle
    // highlightBox = document.getElementById('highlightBox');
    // highlightBox.checked = highlight;
    // highlightBox.addEventListener('change', () => {
    //     highlight = highlightBox.checked;
    //     console.log(highlight);
    // }
    // )

    // set and update the timing toggle
    // timingToggle = document.getElementById('timingtoggle');
    // if (timing == 'evenly') {
    //     document.getElementById('evenlyradio').checked = true;
    // }
    // else {
    //     document.getElementById('syllableradio').checked = true;
    // }

    // timingToggle.addEventListener('change', () => {
    //     if (document.getElementById('evenlyradio').checked) {
    //         timing = 'evenly';
    //         // document.getElementById('syllableradio').checked = false;
    //     }
    //     else {
    //         timing = 'syllable';
    //         // document.getElementById('syllableradio').checked = tr;
    //         // document.getElementById('evenlyradio').checked = false;
    //     }
    //     console.log(timing);

        

    // }
    // )

    fullScreenbtn = document.getElementById('full-screen');
    fullScreenbtn.addEventListener('click', () => {
        makeFullScreen();
        // telepromptarea.requestFullscreen();
        // telepromptarea.style.width = '100vw';
        // telepromptarea.style.height = '100vh';
        
        // telepromptarea.style.position = 'fixed';
        document.getElementById('start-stop-restart').hidden = false;
    })


    let buttonGroup = document.getElementById('start-stop-restart');
    let isDown = false;
    let offset = [0, 0];
    
    buttonGroup.addEventListener('mousedown', function(event) {
        isDown = true;
        offset = [
            buttonGroup.offsetLeft - event.clientX,
            buttonGroup.offsetTop - event.clientY
        ];
    }, true);
    
    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);
    
    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            buttonGroup.style.left = (event.clientX + offset[0]) + 'px';
            buttonGroup.style.top  = (event.clientY + offset[1]) + 'px';
        }
    }, true);

    // display the text on the teleprompter screen
    let textarea = document.getElementById('telepromptarea');
    textarea.innerText = script;

    let start = document.getElementById('start');
    start.addEventListener('click', () => {
        
        if (fromStart) {
            start.disabled = true;
            countdown();
            fromStart = false;
        } else{
            startTeleprompter();
        }

    
    
    // telepromptarea.value = script;
    });

    let pause = document.getElementById('pause');
    pause.addEventListener('click', () => {
        running = false;
        clearInterval(scrollInterval);
    });

    let stop = document.getElementById('stop');
    stop.addEventListener('click', () => {
        running = false;
        fromStart = true;
        clearInterval(scrollInterval);
        textarea.scrollTop = 0;
        
    });

    window.addEventListener('resize', () => {
        if (running) {
            startTeleprompter();
        }
    }
    )
    
    // startTeleprompter();
    // telepromptarea.value = script;
    });


    let scrollInterval;


// calculate how many lines
// calculate how many words per line
// calculate how many lines per minute

function startTeleprompter() {
    
        let textarea = document.getElementById('telepromptarea');

        let highlightDiv = document.createElement('div');
        highlightDiv.style.backgroundColor = highlightColor;
       
        // script = "\n\n\n\n\n\n" + script + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"; 

       
        textarea.innerText = script;
    
        let words = script.split(' ').length;
        let totalReadTime = (words / WPM) * 60 * 1000; // convert to milliseconds
    
        let totalscrollHeight = textarea.scrollHeight;
        let remainingScrollHeight = textarea.scrollHeight - textarea.scrollTop;
        let speed = totalReadTime / totalscrollHeight; // time per pixel
    
        textarea.style.paddingTop = textarea.clientHeight / 2 + 'px'; 
        // Clear the previous interval
        if (scrollInterval) {
            clearInterval(scrollInterval);
        }
    

        wordIndex = 0;
        // divide the number of word sin the script by the numer of words per minute 
        
        scrollInterval = setInterval(() => {
            textarea.scrollTop++;
            wordIndex++;
            // let highlight_to_show = script.split(' ').slice(wordIndex, wordIndex + 3).join(' ');
            
    

            // Stop the interval when we've scrolled to the bottom
            if (textarea.scrollTop + textarea.clientHeight >= textarea.scrollHeight) {
                clearInterval(scrollInterval);
            }
        }, speed);
    }



let handleKeyDown = (event) => {
if (event.key === ' ') {
    event.preventDefault();
    console.log('Space pressed');
    if (running) {
        running = false;
        clearInterval(scrollInterval);
    } else {
        running = true;
        startTeleprompter();
    }
}
else if (event.key === 'Escape') {
    telepromptarea.classList.remove('full-screen');
    telepromptarea.classList.add('telepromptarea');
    menu.hidden = false;
    if (running) {
        startTeleprompter();
    }
    
}
};


function makeFullScreen() {
    let telepromptarea = document.getElementById('telepromptarea');
    telepromptarea.classList.remove('telepromptarea');
    telepromptarea.classList.add('full-screen');
    let menu = document.getElementById('menu');
    menu.hidden = true;
    
    startTeleprompter();


    // Remove the existing event listener
    document.removeEventListener('keydown', handleKeyDown);

    // Add the new event listener
    document.addEventListener('keydown', handleKeyDown);
    
}

// run teleprompter countdown
// make a countdown timer before the teleprompter starts
// create a blurred, grainy, grey screen with a number in the middle starting from 5 to 1
// when the countdown is done, start the teleprompter
// the countdown should be done in the middle of the screen


function countdown() {
    let telepromptarea = document.getElementById('telepromptarea');
    telepromptarea.innerHTML = '';
    // telepromptarea.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    telepromptarea.classList.add('countdown-bg');
    let countdown = document.createElement('div');
    
    countdown.classList.add('countdown');
    countdown.innerText = '5';
    telepromptarea.appendChild(countdown);
    // document.body.appendChild(countdown);

    let count = 5;
    let interval = setInterval(() => {
        count--;
        countdown.innerText = count;
        if (count === 0) {
            clearInterval(interval);
            countdown.remove();
            telepromptarea.classList.remove('countdown-bg');
            running = true;
            start = document.getElementById('start');
            start.disabled = false;
            startTeleprompter();
        }
    }, 1000);

    
}




   
