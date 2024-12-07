const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.interimResults = false;
    recognition.continuous = true;

document.getElementById('output').addEventListener('click', () => {
    recognition.start();
    console.log("ok")
    document.getElementById('output').disabled = true;
});

recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    //outputDiv.textContent = result;
    console.log(result)
    const inputData = {
        key1: result
    };
    dataok= ""
    fetch('/process_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_data: inputData }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data['output_data'])
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = data['output_data'];
  	    utterance.voice = window.speechSynthesis.getVoices()[0];
	    window.speechSynthesis.speak(utterance);
        location.reload()
    })
    .catch(error => {
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = "could not process";
  	    utterance.voice = window.speechSynthesis.getVoices()[0];
	    window.speechSynthesis.speak(utterance);
        location.reload();
    });
};