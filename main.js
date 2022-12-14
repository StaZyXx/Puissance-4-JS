
let min = 1
let max = 2

let player = Math.trunc(Math.random() * (max - min +1)) + min;


let tableau = [];
let rows = prompt("Quelle est le nombre de lignes que vous souhaitez ?")
let cols = prompt("Quelle est le nombre de colonnes que vous souhaitez ?")
    while (rows < 4 ){
        rows = prompt("Quelle est le nombre de lignes que vous souhaitez ?")
    }
    while (cols < 4){
        cols = prompt("Quelle est le nombre de colonnes que vous souhaitez ?")
    }


function tableauVide(rows, cols){
    for (let i = 0;i<rows;i++){
        tab = []
        for (let j=0;j<cols;j++){
            tab.push(0)
        }
        tableau.push(tab)
    }
}
function showBoard(){
    let insert = "<table>"
    const jeu = document.getElementById("game")
    for (var i = 0;i<tableau.length;i++){
        insert+="<tr>"
        for (var j = 0;j<tableau[i].length;j++){
            insert+="<td id="+j+">"
            switch(tableau[i][j]){
                case 0:
                    insert+="<img width='90px' height='90px' id="+ j +" src='assets/blank.png'>"
                    break
                case 1:
                    insert+="<img width='90px' height='90px' id="+ j +" src='assets/red.png'>"
                    break
                case 2:
                    insert+="<img width='90px' height='90px' id="+ j +" src='assets/blue.png'>"
                    break
            }
            insert+="</td>"
        }
    insert+="</tr>"
    }
    insert+="</table>"
    jeu.innerHTML=insert
}

addEventListener("click",event=>{
    const ID = event.target.id;

    let j = parseInt(ID);
    if (!colsFull(j)){
        let i = getI(j)-1
        tableau[i][j] = player
        if(checkDiags(i,j) || checkCols(j) || checkLines(i)){
            setTimeout(()=>{
                alert("Vous avez gagnez ! La partie a durer: "+ m +" Minutes et "+ s +" Secondes ")
                resetBoard()
                score[player-1]+=1
                displayScores()
            },5)
            
        }
        isStart = true
        playerSwitch()
        showBoard()
        if (boardFull()){
            score[0] +=1 
            score[1] +=1
            displayScores()
            setTimeout(() => {
            
                alert("Match nul recommencez la partie ! La partie a durer: "+ m +" Minutes et "+ s +" Secondes ")
                resetBoard()
            
            }, 5);
        }
    }
})

function getI(j){
    for (let i=0;i<tableau.length;i++){
        if (tableau[i][j]!=0){
            return i
        }
    }
    return tableau.length
}

function colsFull(j){
    return getI(j) == 0
}
function playerSwitch(){
    const color = document.getElementById("showplayer")
    let blue = "<img width='30px' height='30px' src='assets/blue.png'><p>Au tour du Player 1</p>"
    let red = "<img width='30px' height='30px' src='assets/red.png'><p>Au tour du Player 2</p>"
    if (player == 1){
        color.innerHTML = blue
        player = 2
    }
    else{
        color.innerHTML = red
        player = 1
    }
    if (player == 1){
        red
    }
    else{
        blue
    }
}
function boardFull(){
    for (var i = 0;i<tableau.length;i++){
        for (var j = 0;j<tableau[i].length;j++){
            if (tableau[i][j] == 0){
                return false
            }
        }
    }
    return true
}

function resetBoard(){
    tableau = []
    tableauVide(rows, cols)
    showBoard()
    s=0
    m=0
}

function checkLines(i){
    amountPoint = 0
    for (let j = 0;j<tableau[i].length;j++){
        if (tableau[i][j] == player){
            amountPoint++
        }else if(amountPoint >0){
            amountPoint = 0
        }
        if(amountPoint >= 4){
            return true
        }

    }
    return amountPoint >= 4
}
function checkCols(j){
    amountPoint = 0
    for (let i = 0;i<tableau.length;i++){
        if (tableau[i][j] == player){
            amountPoint++
        }else if(amountPoint >0){
            amountPoint = 0
        }
        if(amountPoint >= 4){
            return true
        }
    }
    return amountPoint >= 4

}
function checkDiags(i, j){
    n = tableau.length
    somme_point1 = 0
    tempI = i
    tempJ = j
    while (tempI > 0 && tempJ > 0){
        tempI -= 1
        tempJ -= 1
    } 

    while (tempI <= n-1 && tempJ <= n-1){
        if (tableau[tempI][tempJ] == player){
            somme_point1 += 1
        }else if (tableau[tempI][tempJ] == 0){
            somme_point1 = 0
        }

        if(somme_point1 >= 4){
            return true
        }
        tempI+=1
        tempJ+=1        
    }
    tempI = i
    tempJ = j

    somme_point2 = 0
        while (tempI > 0 && tempJ < n-1){
            tempI -= 1
            tempJ += 1
        }

        while (tempI <= n-1 && tempJ >= 0){
            if (tableau[tempI][tempJ] == player){
                somme_point2 += 1
            }

            else if (tableau[tempI][tempJ] == 0){
                somme_point2 = 0
            }
            
            if(somme_point2 >= 4){
                return true
            }
            tempI+=1
            tempJ-=1
        }   
    return false
}

let isStart = false
let s=0
let m=0

function timer(){
    setInterval(() => {
    if (!isStart)return
    s++
    if (s>=60){
        s-=60
        m+=1
    }
    const timer = document.getElementById("timer")
    timer.innerText ="Timer | Minutes : " + m +" Secondes : "+ s
    }, 1000);
}

let score = [0,0]
localStorage.setItem("score",JSON.stringify(score))
function displayScores(){
    const scores = document.getElementById("scores")
    scores.innerText=score[0]+" VS "+score[1]
}

tableauVide(rows,cols)
showBoard()
timer()