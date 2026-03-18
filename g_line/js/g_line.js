const guide = document.getElementById("line-guide")
guide.innerText = "움직이는 그래프가 랜덤 기준선에 닿는 순간 버튼을 누르는 타이밍 게임"
const startButton = document.getElementById("startButton")
startButton.innerText = "게임 시작하기"
const body = document.getElementsByTagName('body')
const container = document.getElementById('container')

let gamestate = "HOME"
//버튼의 상태 정보를 업데이트 하는 함수
function setGameState(newState){
    gamestate = newState
    render()
}

//버튼을 클릭 할 때마다 버튼의 스타일을 변경하기 위해 존재하는 함수
function render(){
    
    const oldMsg = document.getElementById("result-msg")
    const oldLine = document.querySelectorAll(".line")
    if(oldLine){
        oldLine.forEach((li)=>li.remove())
    }

    if(oldMsg)oldMsg.remove()
    if(gamestate == "HOME"){
        container.style.backgroundImage = "url('../../asset/img/linegamecharacter.png')";
        startButton.style.backgroundColor = "#263747"
        startButton.onclick = () => setGameState("PLAYING")
    }else if(gamestate == 'PLAYING'){
        drawLine()
        container.style.backgroundImage = "none";
        startButton.style.backgroundColor = "#ef4444"
        startButton.innerText = "타이밍 맞춰 누르세요"
        startButton.onclick = () => setGameState("RESULT");
    }else if(gamestate == "RESULT"){
        container.style.backgroundImage = "url('../../asset/img/linegamecharacter.png')";
        const p = document.createElement("p")
        p.id = "result-msg";
        p.style.fontSize = "40px"
        p.style.fontWeight = "bold"
        p.style.color = "black"
        p.style.textAlign = "center";
        p.style.position = 'absolute'
        p.style.left = "50%"
        p.style.top = "70%"
        p.style.whiteSpace = "nowrap";
        p.style.transform = "translate(-50%,-50%)"
        //성공 여부에 따라  텍스트 내용 바뀜
        p.innerText = "스테이지 성공하셨습니다."
        startButton.innerText = "게임시작하기"
        startButton.style.backgroundColor = "#263747";
        startButton.before(p);   
        startButton.onclick = () => setGameState("HOME")
        startButton.onclick = () => setGameState("HOME");
    }
}

//랜덤한 숫자 생성하는 함수
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//랜덤한 위치에 선을 그리는 함수
function drawLine() {
    const guideBottom = guide.offsetTop + guide.offsetHeight;
    
    const buttonTop = startButton.offsetTop;

    let min = guideBottom + 20;
    let max = buttonTop - 50; 

    if (max < min) max = min + 10;

    let y = getRandomInt(min, max);

    const line = document.createElement('div');
    line.className = 'line';
    line.style.borderTop = "2px solid black";
    line.style.position = 'absolute';
    line.style.left = "50%";
    line.style.top = `${y}px`;
    line.style.width = "100%";
    line.style.transform = "translate(-50%, -50%)";
    line.style.zIndex = "5";
    
    container.appendChild(line);
}
render();


