function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifeor=ml5.imageClassifier('MobileNet', modelLoaded)
}

function modelLoaded(){
  console.log("model loaded")
}

function draw(){
  image(video, 0,0,300,300)
  classifeor.classify(video, gotResult)
}
var previous_result=''

function gotResult(error, results){
  if (error){
    console.log(error)
  }
  else{
    if((results[0].confidence > 0.5) &&(previous_result != results[0].label)){
      console.log(results)
      previous_result=results[0].label
      var synth=window.speechSynthesis
      speak_data='object detected is -'+results[0].label
      var speakThis=new SpeechSynthesisUtterance(speak_data)
      synth.speak(speakThis)
      
      document.getElementById("ron").innerHTML=results[0].label
      document.getElementById("roa").innerHTML=results[0].confidence.toFixed(3)
    }
  }

}