var main = (function(){
	var mainText = document.getElementById("mainText") , seconderyText = document.getElementById("seconderyText"); 
	var buttons = document.getElementsByTagName("button") , i = 0 , mainLimit = 14 , seconderyLimit = 28 , evalUsed = false;
	return function(){
		for(i = 0 ; i < buttons.length ; i++)
		{
			//handle buttons clicks
			buttons[i].addEventListener("click",function(){
			//check digit limit
			if(mainText.innerHTML.length == mainLimit || seconderyText.innerHTML.length == seconderyLimit)
			{
				mainText.innerHTML = "0";
				seconderyText.innerHTML = "Digit Limit Met";
				return;
			}
			//check if it is the beginning(no number entered or digit limit met)
			if(mainText.innerHTML == "0")
			{
				//don't allow operators before the first number
				if(isNaN(event.target.innerHTML) && event.target.innerHTML != ".")
					return;	
				mainText.innerHTML = event.target.innerHTML;
				seconderyText.innerHTML = event.target.innerHTML;
			}	
			else if(isNaN(mainText.innerHTML)) //check if the previous input is operator
			{
				if(isNaN(event.target.innerHTML) && event.target.innerHTML != ".")
					return;	
				mainText.innerHTML = event.target.innerHTML;
				seconderyText.innerHTML += event.target.innerHTML;
			}
			else if(event.target.innerHTML == "=") //check for =
			{
				for(i = 1 ; i < seconderyText.innerHTML.length ; i++)
				{
					if(isNaN(seconderyText.innerHTML.charAt(i)) && seconderyText.innerHTML.charAt(i) != ".")
					{
						mainText.innerHTML = "" + eval(seconderyText.innerHTML.replace("×"," * ").replace("÷","/"));
						seconderyText.innerHTML += "=" + mainText.innerHTML;
						evalUsed = true;
						if(mainText.innerHTML.length > mainLimit || seconderyText.innerHTML.length > seconderyLimit)
						{
							mainText.innerHTML = "0";
							seconderyText.innerHTML = "Digit Limit Met";
							evalUsed = false;
							return;
						}
						return;
					}
				}
			}
			else
			{
				//don't allow two operators after each other
				if(isNaN(mainText.innerHTML.charAt(mainText.innerHTML.length - 1)))       
				{
					if(isNaN(event.target.innerHTML.charAt(event.target.innerHTML.length - 1)))
						return;
					//don't allow 0 after an operator
					if(event.target.innerHTML == "0")
						return;
				}
				//check if the input is the remaining of the current number or not
				if(isNaN(event.target.innerHTML) && event.target.innerHTML != ".")
			    {
				    mainText.innerHTML = event.target.innerHTML;
					if(evalUsed)
					{
						evalUsed = false;
						seconderyText.innerHTML = seconderyText.innerHTML.substring(seconderyText.innerHTML.indexOf("=") + 1) + 		     
							                    event.target.innerHTML;
						return;
					}
			    }
				else
				{
					if(evalUsed)
					{
						mainText.innerHTML = event.target.innerHTML;
						seconderyText.innerHTML = event.target.innerHTML;
						evalUsed = false;
						return;
					}
					else
						mainText.innerHTML += event.target.innerHTML;
				}
				seconderyText.innerHTML += event.target.innerHTML;
			}
			});
		}
		//handle clear buttons
		document.getElementById("CE").addEventListener("click",function(){
			mainText.innerHTML = "0";
			seconderyText.innerHTML = "0";
		});
		document.getElementById("AC").addEventListener("click",function(){
			mainText.innerHTML = "0";
			seconderyText.innerHTML = "0";
		});
	};
})();

main();
