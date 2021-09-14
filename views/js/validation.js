let mobile = document.getElementById('phone');
let otpbtn = document.getElementById('otp');
let ticket = document.getElementById('t_no');

ticket.addEventListener('keyup', ()=>{
    if(isNaN(ticket.value) || ticket.value.length == 0){
        document.getElementById('t_error').innerHTML = 'Pls, Enter only Numeric';
    }
    else{
        document.getElementById('t_error').innerHTML = '';
    }
        // document.getElementById('t_check').style.display = 'none';
});

mobile.addEventListener('keyup', ()=>{
    if(isNaN(mobile.value) || mobile.value.length != 10){
        otpbtn.disabled = true;
        otpbtn.style.backgroundColor = '#f0f0f0';
        otpbtn.style.color = '#6d6d6d';
        if(isNaN(mobile.value) || mobile.value.length > 10)
            document.getElementById('m_error').innerHTML = 'Pls, Enter valid Mobile No.';
        else   
            document.getElementById('m_error').innerHTML = '';
    }
    else{  
        otpbtn.disabled = false;
        otpbtn.style.backgroundColor = '#32cd32';
        otpbtn.style.color = 'white';
        document.getElementById('m_error').innerHTML = '';
    }
});

// function check_code(){
//     form = document.getElementById('form');
//     form.action = '#';
//     form.submit();
// }