var numb=new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
var sign=new Array("Spades", "Clubs", "Hearts", "Diamonds");


function player(s)
{
	this.isCpu = s;
	this.index = 0;
	this.stnum = new Array();
	this.stsin = new Array();
	this.balance = 100;
	this.bet = 0;
	this.score = 0;
	this.ika = 0;
	this.getScore = function()
    {	this.score = 0;
	    this.ika = 0;
    	for (k = 0;k < this.index;k++)
		{	if (this.stnum[k] != 1)
			{	if (this.stnum[k] >= 10)
				{this.score += 10;}
				else
				{this.score += this.stnum[k];}
			}
		};
		for (j = 0;j < this.index;j++)
		{if (this.stnum[j] == 1)
			{	if (this.ika == 1)
				{	if (this.score + 10 <= 21)
					{this.score += 10;}
					else if (this.score + 1 > 21)
					{this.score -= 8;}
					else
					{this.score += 1;}
				}
				if (this.ika == 0)
				{	if (this.score + 10 <= 21)
					{this.score += 10;this.ika = 1;}
					else
					{this.score += 1;}
				}
				
			}
		}
    };
	this.clean = function()
    {for (l = 0;l < this.index;l++)
		{this.stnum[l] = null;this.stsin[l] = null;}this.score = 0;this.showScore();this.ika = 0;for (p = 0;p < 5;p++){var who=(s==0)?"u":"c";var ide="crd"+who+"n" + p;var ids="crd"+who+"s" + p;document.getElementById(ide).src="img/null.png";document.getElementById(ids).src="img/null.png";};};
	this.initiate = function()
    {for (i = 0;i < 2;i++)
		{this.stnum[i] = Math.floor(Math.random() * 13) + 1;this.stsin[i] = sign[Math.floor(Math.random() * 4)];}this.index = 2;this.ika = 0;for(y=0;y<2;y++){var ide="crdcn" + y;var ids="crdcs" + y;document.getElementById(ide).src="img/back.jpg";document.getElementById(ids).src="img/back.jpg";}};
	this.hit = function()
    {this.stnum[this.index] = Math.floor(Math.random() * 13) + 1;this.stsin[this.index] = sign[Math.floor(Math.random() * 4)];this.index++;this.getScore();if (this.score >= 21 && s == 0)
		{stopRound();}if (s == 0)
		{this.dispCards();this.showScore();}};
	this.stay = function()
    {stopRound();};
	this.dispCards = function()
    {for (p = 0;p < this.index;p++)
		{var who=(s==0)?"u":"c";var ide="crd"+who+"n" + p;var ids="crd"+who+"s" + p;var col=(this.stsin[p]=="Spades" || this.stsin[p]=="Clubs")?"b":"r";document.getElementById(ide).src="img/"+this.stnum[p]+col+".jpg";document.getElementById(ids).src="img/"+this.stsin[p]+".jpg";}};
    this.showScore = function() {if(this.isCpu == 0){this.getScore();document.getElementById("scoreu").innerHTML = this.score;}else{document.getElementById("scorecp").innerHTML = this.score;}};

}

	
var user = new player(0);
var cpu = new player(1);
	

function startGame()
{
	$("#btnstart").hide();
	//document.getElementById("btnstart").innerHTML="";
	startRound();
}	
	
function startRound()
{
	user.clean();
	cpu.clean();
	$('#result').popup('close');
	setTimeout(function(){$("#popbet").popup("open");},1000);
}	
	


function initRound()
{
	user.clean();
	cpu.clean();
	user.initiate();
	cpu.initiate();
	user.dispCards();
	user.showScore();
	cpuPlay();
}	

function myAlert(strng)
{
	document.getElementById("popupHtml").innerHTML=strng;
	document.getElementById("bal").innerHTML="Balance: "+user.balance;
	$("#result").popup("open");
}

	


function getResults()
{
	user.getScore();
	cpu.getScore();
	u=user.score;
	c=cpu.score;
	if((u==c) || (u>21 && c>21))
	{myAlert("Draw");}
	else if(u>21 && c<=21)
	{user.balance-=user.bet;myAlert("Burst!<br>You Lose!");}
	else if(u<c)
	{user.balance-=user.bet;myAlert("You Lose!");}
	else if(u>c)
	{user.balance+=user.bet;myAlert("You Win!");}
	else
	{user.balance+=user.bet;myAlert("BlackJack!<br>You Win!");}
	if(user.balance==0)
	{
		stopGame();
		setTimeout(function(){$("#result").popup("close");},1000);
	    setTimeout(function(){$("#gameover").popup("open");},2000);
	}
	document.getElementById("balan").innerHTML="Balance: "+user.balance;
	document.getElementById("balan1").innerHTML="Balance: "+user.balance;
}


function cpuPlay()
{
	cpu.getScore();
	if(cpu.score<=21)
	{cpu.hit();cpuPlay();}
	else
	{cpu.index--;cpu.stnum[cpu.index]=null;cpu.stsin[cpu.index]=null;}
	cpu.getScore();
}	


function stopRound()
{
	cpu.dispCards();
	cpu.showScore();
	setTimeout(function(){getResults();},1000);
}
	


function checkBet()
{
	user.bet=parseInt(document.getElementById("bet").value);
	if(user.bet<=user.balance)
	{$('#popbet').popup('close');initRound();}
	else
	{document.getElementById("warn").innerHTML="You don't have that much balance.<br>Please try again";}
}	
	
	
	
function stopGame()
{
	$("#btnstart").show();
	//document.getElementById("btnstart").innerHTML=' <button data-inline="true" data-mini="true" data-theme="a" onclick="startGame();" id="btnstr">Start</button>';
	user.clean();
	cpu.clean();
	user.balance=100;
	user.bet=0;
	document.getElementById("balan").innerHTML="Balance: "+user.balance;
	document.getElementById("balan1").innerHTML="Balance: "+user.balance;
}	
	


	
