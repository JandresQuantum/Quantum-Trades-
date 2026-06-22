let trades = JSON.parse(
localStorage.getItem("trades")
) || [];

function saveTrade(){

const trade = {

date:
document.getElementById("date").value,

strategy:
document.getElementById("strategy").value,

result:
document.getElementById("result").value,

rr:
Number(
document.getElementById("rrInput").value
)

};

trades.push(trade);

localStorage.setItem(
"trades",
JSON.stringify(trades)
);

updateRanking();

alert("Trade Guardado");

}

function updateRanking(){

const ranking =
document.getElementById("ranking");

const strategies = {};

trades.forEach(t=>{

if(!strategies[t.strategy]){

strategies[t.strategy]={
trades:0,
wins:0
};

}

strategies[t.strategy].trades++;

if(t.result==="Win")
strategies[t.strategy].wins++;

});

ranking.innerHTML="";

Object.keys(strategies)

.map(name=>{

const data=strategies[name];

return {

name,

wr:
Math.round(
(data.wins/data.trades)*100
)

};

})

.sort((a,b)=>b.wr-a.wr)

.forEach((s,index)=>{

const medal =
["🥇","🥈","🥉"][index] || "";

ranking.innerHTML += `

<div class="strategy">

<p>
${medal} ${s.name}
</p>

<div class="bar">

<div
class="fill"
style="width:${s.wr}%">

${s.wr}%

</div>

</div>

</div>

`;

});

}

new Chart(

document.getElementById(
"equityChart"
),

{
type:"line",

data:{

labels:[
"L",
"M",
"X",
"J",
"V"
],

datasets:[{

label:"Equity",

data:[
10000,
10150,
10080,
10300,
10542
],

borderColor:"#00ffff",

tension:0.4

}]

}

}

);

updateRanking();
