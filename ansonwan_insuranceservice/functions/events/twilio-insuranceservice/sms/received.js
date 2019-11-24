const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for Twilio sms.received event
* @param {object} event
* @returns {object} result The result of your workflow steps
*/
module.exports = async (event) => {

  // Prepare workflow object to store API responses
  
  var insuranceQuote = 0;
  
  function licenseTypeCheck (input) {
    var sum1 = 0;
    if (input[3] == "G") {
      sum1 += 15;
    } else if (input == "G2") {
      sum1 += 35;
    } else {
      sum1 += 75;
    }
    return sum1;
  }
  
  function ageCheck (input) {
    var sum2 = 0;
    if (parseInt(input[2]) <= 25) {
      sum2 += 100;
    } else if (parseInt(input[2]) > 25 && parseInt(input[2]) <= 65){
      sum2 += 50;
    } else {
      sum2 += 75;
    }
    return sum2;
  }
  
  function genderCheck (input) {
    var sum3 = 0
    if (input[1] == "male"){
      sum3 += 30;
    } else {
      sum3 += 0;
    }
    return sum3;
  }
  


  let result = {};
  
  
  switch(event.Body.trim().toLowerCase()) {
    
    case 'insurance help':
      result = await lib.twilio.messages['@0.1.1'].create({
        to: "6479888689",
        body: "Please enter some parameters in this format so we can give you a new insurance quote: \n <Name>, <Gender>, <Age>, <License Type>, <Demerit Points>"
        })
      break;
      
      

    default:
      var payload = event.Body.trim().toLowerCase().split(",");
      if (payload.length == 5) {
        
        // [Workflow Step 1]
        
      
        console.log(`Running airtable.records[@0.2.1].create()...`);
        
        result.step1 = {};
        result.step1.record = await lib.airtable.records['@0.2.1'].create({
          table: `Master Table`,
          fields: {
            "Name": payload[0].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '),
            "Gender": payload[1].trim(),
            "Age": payload[2].trim(),
            "LicenseType": payload[3].trim().toUpperCase(),
            "DemeritPoints": payload[4].trim()
          }
        });
        
        //[Workflow Step 2]
      
        console.log(`Running airtable.records[@0.2.1].retrieve()...`);
      
        result.step2 = {};
        result.step2.record = await lib.airtable.records['@0.2.1'].retrieve({
        table: `Master Table`,
        id: `recMT7MlkdNKfNQnE`
        });
      
        //[Workflow Step 3]
      
        console.log(`Running twilio.messages[@0.1.1].create()...`);
        
        
        insuranceQuote = licenseTypeCheck(payload) + genderCheck(payload) + ageCheck(payload);
        
        
        result.step3 = {};
        result.step3.returnValue = await lib.twilio.messages['@0.1.1'].create({
          
          
         
          to: `6479888689`,
          body: "Your new estimated insurance quote is: $" + insuranceQuote.toString()
       
        });
        
        return result;
        
        
        
        
      } else {
        result = await lib.twilio.messages['@0.1.1'].create({
        to: "6479888689",
        body: "Please enter some parameters in this format so we can give you a new insurance quote: \n <Name>, <Gender>, <Age>, <License Type>, <Demerit Points>"
      });
      
    }
  };
}
