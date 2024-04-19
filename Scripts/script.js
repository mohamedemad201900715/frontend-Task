//Start form 1
// Start Dropdown List
var dropdownButtons = document.querySelectorAll('#form-1 .dropdown-toggle');
dropdownButtons.forEach((dropdownButton) => {
    var dropdownItems = dropdownButton.nextElementSibling.querySelectorAll('#form-1 .dropdown-item');
    dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
            var selectedItemText = item.textContent.trim();
            dropdownButton.textContent = selectedItemText;
            dropdownItems.forEach((item2)=>{
                item2.classList.remove('active');
            });
            item.classList.add('active');
            var inputElement; 
            if (dropdownButton.id === 'car-maker-dropdown') {
                inputElement = document.getElementById('car-maker');
                inputElement.value = item.getAttribute('data-value');
            } else if (dropdownButton.id === 'car-model-dropdown') {
                inputElement = document.getElementById('car-model');
                inputElement.value = item.getAttribute('data-value');
            } else if (dropdownButton.id === 'car-year-dropdown') {
                inputElement = document.getElementById('car-year');
                inputElement.value = item.getAttribute('data-value');
            }
            if (inputElement) {
                inputElement.dispatchEvent(new Event('change'));
            }
        });
    });
});
// Get all required form-1 elements
const formElementsForm1 = document.querySelectorAll('#form-1 input');
formElementsForm1.forEach(element => {
    element.addEventListener('change', () => {
        const allFilled = Array.from(formElementsForm1).every(element => {
            if (element.type === "radio") {
                getRequiredField(element); //effect on form2
                return document.querySelector(`#form-1 input[name="${element.name}"]:checked`) !== null;
            } else {
                return element.value.trim() !== '';
            }
        });

        if (allFilled) {
            document.querySelector('.car-image').style.display = 'block';
            document.querySelector(".next-form1-btn").disabled = false;

        } else {
            document.querySelector('.car-image').style.display = 'none';
            document.querySelector(".next-form1-btn").disabled = true;

        }
    });
});
// redirect to form 2
var nextForm1 = document.querySelector(".next-form1-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-1').style.display = "none";
    document.getElementById('form-2').style.display = "block";
    allRequiredForm2(); //Effect form2
    
});

//End form 1
//Start form 2
// Make input required
function getRequiredField(element){
    if (!element.checked){
        return ;
    }
    const structureNumber = document.getElementById("structure-number");
    const structureNumberContainer = document.getElementById("input-structure-number");
 if (structureNumber && structureNumberContainer) {
        if (element.value === "فردي") {
            structureNumber.required = true;
            structureNumberContainer.style.display = "block";
            document.getElementById("Serial-number").required =false;
            document.querySelector('label[for="Serial-number"]').textContent= "رقم مسلسل القطعه:"
            document.getElementById('piece-number').setAttribute('min', '1');
        } else {
            structureNumber.required = false;
            structureNumberContainer.style.display = "none";
            document.getElementById("Serial-number").required =true;
            document.querySelector('label[for="Serial-number"]').textContent= "رقم مسلسل القطعه:*"
            document.getElementById('piece-number').setAttribute('min', '10');

        }
    } else {
        console.log("Error: Element not found");
    }
   
}

// Get all required form-2 elements
function allRequiredForm2(){
    const formElementsForm2 = document.querySelectorAll('#form-2 input[required]');
    formElementsForm2.forEach(element => {
        element.addEventListener('input', () => {
            const allFilled = Array.from(formElementsForm2).every(element => {
                    return element.value.trim() !== '';
            });
    
            if (allFilled && numberPieceValidation()) {
                document.querySelector(".next-form2-btn").disabled = false;
            } else {
                document.querySelector(".next-form2-btn").disabled = true;
            }
        });
    });
}
//reg number from min
var numberInput = document.getElementById('piece-number').addEventListener('input', numberPieceValidation);
function numberPieceValidation(){
    
        var numberInput = document.getElementById('piece-number');
        var minNumber = document.getElementById('piece-number').getAttribute('min');
        var feedback = document.getElementById('numberFeedback');
        var numberPattern = /^[0-9]+$/;
        if (numberInput.value === '') {
            feedback.textContent = '';
            feedback.style.color = 'black';
        } else if (numberPattern.test(numberInput.value) && parseInt(numberInput.value) >= minNumber) {
            feedback.textContent = 'الرقم صالح';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `الرقم غير صالح يجب البدأ من الرقم ${minNumber}`;
            feedback.style.color = 'red';
        }
        return numberPattern.test(numberInput.value)  && numberInput.value >=  minNumber - 1;
    
}





// redirect to form 3
var nextForm1 = document.querySelector(".next-form2-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-2').style.display = "none";
    document.getElementById('form-3').style.display = "block";
});
// redirect back to form 1
var nextForm1 = document.querySelector(".back-form2-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-2').style.display = "none";
    document.getElementById('form-1').style.display = "block";
});

//End form 2

//Start form 3
// confirm is email
document.getElementById('client-email').addEventListener('input',emailValidation);
function emailValidation(){
    {
        var emailInput = document.getElementById('client-email');
        var feedback = document.getElementById('emailFeedback');
        var emailPattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (emailInput.value === '') {
            feedback.textContent = '';
            feedback.style.color = 'black';
            console.log("run here")
        } else if (emailPattern.test(emailInput.value)) {
            feedback.textContent = 'البريد الإلكتروني صالح';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = 'البريد الإلكتروني غير صالح';
            feedback.style.color = 'red';
        }
        return emailPattern.test(emailInput.value);
    }
}
// confirm password
document.getElementById('client-Password').addEventListener('input', checkPasswordMatch);
document.getElementById('client-confirm-Password').addEventListener('input', checkPasswordMatch);

function checkPasswordMatch() {
    var password = document.getElementById('client-Password').value;
    var confirmPassword = document.getElementById('client-confirm-Password').value;
    var feedback = document.getElementById('passwordMatch');
    if(!confirmPassword  &&!password){
        feedback.textContent = ''; 
        feedback.style.color = 'black';
        return false;
    }
    else if (password === confirmPassword) {
        feedback.textContent = 'كلمات السر متطابقة'; 
        feedback.style.color = 'green';
        return true;
    }
     
    else {
        feedback.textContent = 'كلمات السر غير متطابقة'; 
        feedback.style.color = 'red';
        return false;
    }
}

// Get all required form-3 elements
const formElementsForm3 = document.querySelectorAll('#form-3 input[required]');
formElementsForm3.forEach(element => {
    element.addEventListener('input', () => {
        const allFilled = Array.from(formElementsForm3).every(element => {
                return element.value.trim() !== '' && checkPasswordMatch() && emailValidation() ;
        });
        const countrySelected = document.querySelector('.custom-selector').getAttribute('data-value') !== '';
        const phoneNumber = document.getElementById('client-number').classList.contains('is-valid');
        if (allFilled && countrySelected && phoneNumber) {
            document.querySelector(".next-form3-btn").disabled = false;
        } else {
            document.querySelector(".next-form3-btn").disabled = true;
        }
    });
});
// redirect to form 4
var nextForm1 = document.querySelector(".next-form3-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-3').style.display = "none";
    document.getElementById('form-4').style.display = "block";
});
// redirect back to form 2
var nextForm1 = document.querySelector(".back-form3-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-3').style.display = "none";
    document.getElementById('form-2').style.display = "block";
});
//End form 3
// Start form 4
// Get all required form-4 elements
const formElementsForm4 = document.querySelectorAll('#form-4 input[required]');
formElementsForm4.forEach(element => {
    element.addEventListener('change', () => {
        const allFilled = Array.from(formElementsForm4).every(element => {
            if (element.type === "radio") {
                return document.querySelector(`#form-4 input[name="${element.name}"]:checked`) !== null;
            } else {
                return element.value.trim() !== '';
            }
        });
        const countrySelected = document.querySelector('.number-2 .custom-selector').getAttribute('data-value') !== '';
        const phoneNumber = document.getElementById('client-delever-number').classList.contains('is-valid');

        if (allFilled && countrySelected && phoneNumber) {
            document.querySelector(".next-form4-btn").disabled = false;
        } else {
            document.querySelector(".next-form4-btn").disabled = true;
        }
    });
    element.addEventListener('input', () => {
        const allFilled = Array.from(formElementsForm4).every(element => {
                return element.value.trim() !== '' ;
        });
        const countrySelected = document.querySelector('.number-2 .custom-selector').getAttribute('data-value') !== '';
        const phoneNumber = document.getElementById('client-delever-number').classList.contains('is-valid');
        if (allFilled && countrySelected && phoneNumber) {
            document.querySelector(".next-form4-btn").disabled = false;
        } else {
            document.querySelector(".next-form4-btn").disabled = true;
        }
    });
});

// redirect back to form 2
var nextForm1 = document.querySelector(".back-form4-btn");
nextForm1.addEventListener("click", () => {
    document.getElementById('form-4').style.display = "none";
    document.getElementById('form-3').style.display = "block";
});
    
// data phone numbers 
const countries = [
    { code: '1', flagUrl: 'https://flagcdn.com/w20/us.png', name: 'United States' },
    { code: '14', flagUrl: 'https://flagcdn.com/w20/gb.png', name: 'United Kingdom' },
    { code: '1', flagUrl: 'https://flagcdn.com/w20/ca.png', name: 'Canada' },
    { code: '20', flagUrl: 'https://flagcdn.com/w20/eg.png', name: 'Egypt' }
];
// phone Number
document.addEventListener('DOMContentLoaded', ()=> {
    const customSelector = document.querySelector('.custom-selector');
    const customSelector2 = document.querySelector('.number-2 .custom-selector ');
    const customOptionsContainer = document.querySelector('.custom-options');
    const customOptionsContainer2 = document.querySelector('.number-2 .custom-options');
    countries.forEach(country => {
        const option = document.createElement('div');
        option.classList.add('custom-option');
        option.setAttribute('data-value', `${country.code}`);
        option.innerHTML = `<img src="${country.flagUrl}" alt="${country.name}" style="width: 10px; height: 10px; margin-right: 10px;">${country.name} (+${country.code})`;
        customOptionsContainer.appendChild(option);
        const option2 = document.createElement('div');
        option2.classList.add('custom-option');
        option2.setAttribute('data-value', `${country.code}`);
        option2.innerHTML = option.innerHTML;  
        customOptionsContainer2.appendChild(option2);
        option.addEventListener('click', function() {
            customSelector.firstChild.textContent = this.textContent;
            customSelector.setAttribute('data-value', this.getAttribute('data-value'));
            customOptionsContainer.style.display = 'none';
        });
        option2.addEventListener('click', function() {
            customSelector2.firstChild.textContent =this.textContent;
            customSelector2.setAttribute('data-value', this.getAttribute('data-value'));
            customOptionsContainer2.style.display = 'none';
        });
    });

    customSelector.addEventListener('click', () => {
        customOptionsContainer.style.display = customOptionsContainer.style.display === 'none' ? 'block' : 'none';
    });
    customSelector2.addEventListener('click', () => {
        customOptionsContainer2.style.display = customOptionsContainer2.style.display === 'none' ? 'block' : 'none';
    });

});
// validate phone number input
const phoneNumberInputClient = document.getElementById('client-number');
const phoneNumberInputDelever = document.getElementById('client-delever-number');
function validatePhoneNumber(phoneNumberInput) {
    if(!phoneNumberInput.value){
        return false;
    }
    const regex = /^\+?\d{9,15}$/; 
    return regex.test(phoneNumberInput.value);
}

phoneNumberInputClient.addEventListener('input', function() {
    const isValidPhoneNumber = validatePhoneNumber(phoneNumberInputClient);
    if (isValidPhoneNumber) {
        phoneNumberInputClient.classList.remove('is-invalid');
        phoneNumberInputClient.classList.add('is-valid');
    } else {
        phoneNumberInputClient.classList.remove('is-valid');
        phoneNumberInputClient.classList.add('is-invalid');
    }
});

phoneNumberInputDelever.addEventListener('input', function() {
    const isValidPhoneNumber = validatePhoneNumber(phoneNumberInputDelever);
    if (isValidPhoneNumber) {
        phoneNumberInputDelever.classList.remove('is-invalid');
        phoneNumberInputDelever.classList.add('is-valid');
    } else {
        phoneNumberInputDelever.classList.remove('is-valid');
        phoneNumberInputDelever.classList.add('is-invalid');
    }
});
//form 5
function getToForm() {
    var data = [];
//form1
    var formType = document.querySelector('input[name="type-form"]:checked');
    if (formType) {
        data.push({ formType: formType.value });
    }
    console.log(data);
    var carInfo = {
        carMaker: document.getElementById('car-maker').value,
        carModel: document.getElementById('car-model').value,
        carYear: document.getElementById('car-year').value
    };
    data.push(carInfo);

    //form2
    var pieceInfo = {
        pieceName: document.getElementById('piece-Name').value,
        pieceNumber: document.getElementById('piece-number').value,
        serialNumber: document.getElementById('Serial-number').value,
        structureNumber: document.getElementById('structure-number').value,
        pieceDescription: document.getElementById('floatingTextarea').value
    };
    data.push(pieceInfo);

     //form3
     var codeNumber = document.querySelector('#form-2 .custom-selector');
     var clientInfo = {
        clientName: document.getElementById('client-name').value,
        clientEmail: document.getElementById('client-email').value,
        clientCodeNumber: codeNumber,
        clientNumber: document.getElementById('client-number').value,
        clientPassword: document.getElementById('client-Password').value
    };
    data.push(clientInfo);

     //form4
         var codeDeleverNumber = document.querySelector('.number-2 .custom-selector').getAttribute('data-value');
        var shippingType = document.querySelector('input[name="form-type"]:checked');
        var additionalClientInfo = {
        shippingType: shippingType ? shippingType.value : null,
        clientArabicName: document.getElementById('client-arabic-name').value,
        clientEnglishName: document.getElementById('client-englich-name').value,
        address: document.getElementById('inputAddress').value,
        country: document.getElementById('inputCountry').value,
        city: document.getElementById('inputCity').value,
        state: document.getElementById('inputState').value,
        zip: document.getElementById('inputZip').value,
        codeNumber: codeDeleverNumber,
        phoneNumber: document.getElementById('client-delever-number').value
    };
    data.push(additionalClientInfo);
    console.log(data);
    var formData ;
    data.forEach((item)=>{
        if(item.formType){
            formData = document.createElement('p');
            formData.innerHTML = `نوع النموزج: ${item.formType}`;
            formData.classList.add('text-center');
            document.querySelector('#form-5 .container').appendChild(formData);
        }
        if(item.carMaker){
            formData = document.createElement('p');
            formData.innerHTML = `صانع السياره: ${item.carMaker}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container').appendChild(formData);
        }
         if(item.carModel){
            formData = document.createElement('p');
            formData.innerHTML = `طراز السياره: ${item.carModel}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.carYear){
            formData = document.createElement('p');
            formData.innerHTML = `سنة الصنع: ${item.carYear}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.pieceName){
            formData = document.createElement('p');
            formData.innerHTML = `اسم القطعه: ${item.pieceName}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.pieceNumber){
            formData = document.createElement('p');
            formData.innerHTML = `عدد القطع: ${item.pieceNumber}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
        
         if(item.serialNumber){
            formData = document.createElement('p');
            formData.innerHTML = `رقم مسلسل القطعه: ${item.serialNumber}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.structureNumber){
            formData = document.createElement('p');
            formData.innerHTML = `رقم هيكل السياره: ${item.structureNumber}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.pieceDescription){
            formData = document.createElement('p');
            formData.innerHTML = `وصف القطعه: ${item.pieceDescription}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.clientArabicName){
            formData = document.createElement('p');
            formData.innerHTML = `الأسم بالعربي: ${item.clientArabicName}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.clientEnglishName){
            formData = document.createElement('p');
            formData.innerHTML = `الأسم بالأنجليزيه: ${item.clientEnglishName}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.clientEmail){
            formData = document.createElement('p');
            formData.innerHTML = `الأيميل: ${item.clientEmail}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.phoneNumber && item.codeNumber){
            formData = document.createElement('p');
            formData.innerHTML = `رقم الهاتف: ${item.phoneNumber} +${item.codeNumber}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
        if(item.shippingType){
            formData = document.createElement('p');
            formData.innerHTML = `نوع الشحن: ${item.shippingType}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.address){
            formData = document.createElement('p');
            formData.innerHTML = `العنوان: ${item.address}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.country){
            formData = document.createElement('p');
            formData.innerHTML = `الدوله: ${item.country}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.state){
            formData = document.createElement('p');
            formData.innerHTML = `المدينه: ${item.state}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.city){
            formData = document.createElement('p');
            formData.innerHTML = `الحي: ${item.city}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
         if(item.zip){
            formData = document.createElement('p');
            formData.innerHTML = `الرمز البريدي: ${item.zip}`;
            formData.classList.add('fw-bold');
            document.querySelector('#form-5 .container ').appendChild(formData);
        }
        
    });

    
    document.getElementById('form-4').style.display = "none";
    document.getElementById('form-5').style.display = "block";


}


//cancel button
const toastTriggerCancel = document.getElementById('liveToastCancelBtn')
const toastLiveExampleCancel = document.getElementById('liveToastCancel')
if (toastTriggerCancel) {
  const toastBootstrapCancel = bootstrap.Toast.getOrCreateInstance(toastLiveExampleCancel)
  toastTriggerCancel.addEventListener('click', () => {
    toastBootstrapCancel.show();
    document.getElementById('form-5').style.display = "none";
    document.getElementById('form-1').style.display = "block";
  })
}
// back form 5
const backBtn = document.querySelector('.back-form5-btn');
backBtn.addEventListener('click', ()=>{
    document.getElementById('form-5').style.display = "none";
    document.getElementById('form-4').style.display = "block";
} )