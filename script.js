let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Initialize Speech Synthesis
function speak(text) {
    let text_talk = new SpeechSynthesisUtterance(text);
    text_talk.rate = 1;
    text_talk.pitch = 1;
    text_talk.volume = 1;
    text_talk.lang = "en-US";
    window.speechSynthesis.speak(text_talk);
}

// Initialize Greeting
function greetMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Ma'am");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Ma'am");
    } else {
        speak("Good Evening Ma'am");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();


recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}


btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "block";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Ma'am, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Athena, your virtual assistant, created by Shweta Ma'am.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open telegram")) {
        speak("Opening Telegram...");
        window.open("https://web.telegram.org/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        // Local apps like calculators may not open via browsers
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else {
        let finalText = `This is what I found on the internet regarding ${message}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
