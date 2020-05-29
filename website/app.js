//API Credentials
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=91a6c38804540dc1f9f57c0fdb116702';

let d = new Date();
const newDate = d.getMonth()+'.'+d.getDate()+'.'+d.getFullYear();




// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateResults);

/* Function called by event listener */
function generateResults(el){
  const userFeelings = document.getElementById('feelings').value;
  const userZip = document.getElementById('zip').value;

  //API Call
  getWeather(baseURL, userZip, apiKey)
    .then (function(data){
        console.log(data)
        postData('/addInfo', {temperature: data.main.temp, date: newDate, userFeelings: userFeelings})
          .then(function(){
              updateUI ();
            })
        });
      }

//function to make API call
  const getWeather = async (baseURL, userZip, apiKey)=>{
    const response = await fetch(baseURL+userZip+apiKey);

      try {
        const userEntry = await response.json();
        return userEntry;
      } catch (error) {
        console.log("error",error);
        }
      }

//POST function
  const postData = async (url = '', data = {})=> {
    //console.log(data);
    const response = await fetch('/addInfo', {
      method: 'POST',
      credentials: 'same-origin',
      headers:  {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch (error){
        console.log('error', error);
      }
}

//Update UI
const updateUI = async () => {
  console.log('updateUi is running!');
  const request = await fetch ('http://localhost:3000/addInfo');
  try {
    const allData = await request.json();
    console.log('Update UI', allData);

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData.userFeelings;
  }
  catch (error){
    console.log('error', error)
  };
};
