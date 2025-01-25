const resultElement = document.getElementById('result');
let recognition;

function startConverting() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    } else {
        alert('Speech recognition is not supported in your browser.');
    }
}

function setupRecognition(recognition) {
    recognition.continuous =true;
    recognition.interimResults = true;
    const selectedLanguage = document.getElementById('languageSelector').value;
    recognition.lang = selectedLanguage;
    recognition.onresult = function(event) {
        const { finalTranscript, interimTranscript }= processResult(event.results);
        resultElement.innerHTML = finalTranscript + '<span style="color:#999">' + interimTranscript + '</span>';
    };

    recognition.onerror =function(event) {
        console.error('Speech recognition error:',event.error);
    };

    recognition.onend =function() {
        console.log('Speech recognition ended.');
    };
}

function processResult(results){
    let finalTranscript ='';
    let interimTranscript= '';

    for (let i = 0; i <results.length; i++) {
        let transcript= results[i][0].transcript;
        transcript = transcript.replace("\n","<br>"); 
        if (results[i].isFinal){
            finalTranscript +=transcript;
        } else {
            interimTranscript +=transcript;
        }
    }
    return {finalTranscript, interimTranscript};
}

function stopConverting() {
    if (recognition){
        recognition.stop();
        console.log('Speech recognition stopped.');
    }
}
