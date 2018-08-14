var operations = {"plus":add,"minus":subtract,"multiply":multiply,"divide":divide};
var symbols = {"plus":"+", "minus":"-", "multiply":"*", "divide":"/"}

var operator = undefined;
var a = undefined;
var b = undefined;
var result = undefined;

var screenA = document.getElementById("a");
var screenB = document.getElementById("b");
var numButtons = document.getElementsByClassName("number");
var operButtons = document.getElementsByClassName("operator");
var ac = document.getElementById("ac");
var ce = document.getElementById("ce");
var dot = document.getElementById("dot");
var equal = document.getElementById("equal");
var aDot = false;
var bDot = false;
var aMinus = false;
var bMinus = false;

for(var i = 0; i < numButtons.length; i++)
{
	numButtons[i].addEventListener("click", function(e)
	{
		screenA.parentNode.style.textAlign = "right";
		if(a === undefined)
		{
			a = this.innerText;
			screenA.innerText = a;

		}
		else if(operator === undefined)
		{
			a = a + this.innerText;
			if(a.length !== 13)
				screenA.innerText = a;
			else
			{	
				clearAll();
				screenA.parentNode.style.textAlign = "center";
				screenA.innerText = "Out Of Range";
			}
		}
		else if(operator !== undefined)
		{
			if(b === undefined)
			{
				b = this.innerText;
				screenB.innerText = symbols[operator] + " " + b;
			}
			else
			{
				b = b + this.innerText;
				if(b.length !== 13)
					screenB.innerText = symbols[operator] + " " + b;
				else
				{
					clearAll();
					screenA.parentNode.style.textAlign = "center";
					screenA.innerText = "Out Of Range";
				}
			}
		}
	});
}

for(var i = 0; i < operButtons.length; i++)
{
	operButtons[i].addEventListener("click", function(e)
	{
		screenA.parentNode.style.textAlign = "right";

		if(a !== undefined && b !== undefined)
		{
			evaluate();
		}

		if(a === undefined && this.id === "minus")
		{
			a = "-";
			screenA.innerText = a;
		}
		if(operator !== undefined && b === undefined && this.id === "minus")
		{
			b = "-";
			screenB.innerText = symbols[operator] + " " + b;
		}
		if(a !== undefined && operator === undefined && (a.length > 1 || a[0] !== "-"))
		{
			operator = this.id;
			result = undefined;
			screenB.innerText = symbols[operator];
		}

		if(result !== undefined)
		{
			a = result;
			screenA.innerText = a;
			result = undefined;
			operator = this.id;
			screenB.innerText = symbols[operator];
		}

	});
}

dot.addEventListener("click", function(e)
{
	if(operator === undefined)
	{
		if(aDot === false)
		{
			if(a === undefined)
			{
				a = "0.";
				screenA.innerText = a;
			}
			else
			{
				a = a + ".";
				screenA.innerText = a;
			}

			aDot = true;
		}
	}

	else
	{
		if(bDot === false)
		{
			if(b === undefined)
			{
				b = "0.";
				screenB.innerText = symbols[operator] + " " + b;
			}
			else
			{
				b = b + ".";
				screenB.innerText = symbols[operator] + " " + b;
			}

			bDot = true;
		}
	}
});

equal.addEventListener("click",evaluate);

ac.addEventListener("click", function(e)
{
	screenA.parentNode.style.textAlign = "right";
	clearAll();
});

ce.addEventListener("click", function(e)
{
	screenA.parentNode.style.textAlign = "right";

	if(result !== undefined)
		clearAll();

	else if(b !== undefined && operator !== undefined)
	{
		b = undefined;
		bDot = false;
		screenB.innerText = symbols[operator];
	}

	else if(a !== undefined && operator !== undefined && b === undefined)
	{
		operator = undefined;
		screenB.innerText = "";
	}
	else if(a !== undefined && operator === undefined)
	{	
		a = undefined;
		aDot = false;
		screenA.innerText = 0;
	}
	else
		clearAll();

});

function evaluate()
{
	if(b !== undefined)
	{
		result = operations[operator](parseFloat(a),parseFloat(b));
		a = undefined;
		b = undefined;
		operator = undefined;
		bDot = false;
		aDot = false;
		screenA.innerText = result;
		screenB.innerText = "";
	}
}

function add(opr1, opr2)
{
	result = opr1 + opr2;
	result = Math.round(result*100)/100;
	return result;
}

function subtract(opr1, opr2)
{
	result = opr1 - opr2;
	result = Math.round(result*100)/100;
	return result;
}

function multiply(opr1, opr2)
{
	result = opr1 * opr2;
	result = Math.round(result*100)/100;
	return result;
}

function divide(opr1, opr2)
{
	if(opr2 === 0)
	{
		b = undefined;
		return undefined;
	}
	result = Math.round((opr1 / opr2)*100)/100;
	return result;
}

function clearAll()
{
	a = undefined;
	b = undefined;
	result = undefined;
	operator = undefined;
	aDot = false;
	bDot = false;

	screenA.innerText = "0";
	screenB.innerText = "";
}