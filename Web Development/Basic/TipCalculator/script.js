let calculateBtn = document.getElementById('calculateBtn');

let calculate = function () {
    
    let totalBill = document.getElementById('totalBill');
    let servicePer = document.getElementById('servicePer');
    let numPeople = document.getElementById('numPeople');
    let result = document.getElementById('result');

    // Validate Input 
    let error = 0;

    // Check if the totalBill is empty
    if(totalBill.value == ""){
        totalBill.style.borderColor = "#f002028a";
        error=1;
    }else{
        totalBill.style.borderColor = "#504E4E";
        error=0;
    }


    // Check if the service % is empty
    if(servicePer.value == 0){
        servicePer.style.borderColor = "#f002028a";
        error=1;
    }else{
        servicePer.style.borderColor = "#504E4E";
        error=0;
    }

    // Check if ther is no error 
    if(!error){
        let tip = 0 ;

        // Calculate tip 
        let tipInit = totalBill.value * servicePer.value ;

        // if more than one people are sharing the bill and not empty
        if(numPeople.value != 1 && numPeople.value!=""){
            // Tip divided by the people that sharing the bill 
            let tipEach = tipInit / numPeople.value ;

            // round to decimal places
            let tipEachRounded = Math.round(tipEach*100) / 100 ;

            // The next line allows us to always have 2 digits after decimal point
            tipEachRounded = tipEachRounded.toFixed(2);

            // If the tip rounded to 0 assign tipEach else assign tipEachRounded and 'each' string
            tip = tipEachRounded == 0 ? tipEach + '  each' : tipEachRounded + '  each';

        }else{
            // round to 2 decimal places
            let tipRounded = Math.round(tipInit*100) / 100 ;

            // The next line allows us to always have 2 digits after decimal point
            tipRounded = tipRounded.toFixed(2);

            // If the tip rounded to 0 assign tipInit else assign tipRounded
            tip = tipRounded == 0 ? tipInit : tipRounded;

        }
        
        // Print the final result 
        result.innerText = tip ;
    }else{
        return;
    }
}

// Adding click Event to the calculate Button 
calculateBtn.addEventListener('click' , calculate);