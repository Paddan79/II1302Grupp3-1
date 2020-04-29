//PLEASE NOTE THAT THESE HASHING FUNCTIONS ARE NOT SECURE
//THEY SHOULD NOT BE USED FOR ANY SERIOUS CRYPTOGRAPHY UNLESS
//YOU WANT SENSITIVE DATA TO BE ACCESSED BY UNAUTHORIZED USERS

//source: https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
function hash(string_input){
  let hash = 5059;
  if(string_input.length == 0) return hash;
  for(i=0; i<string_input.length; i++){
    char = string_input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}
//my salting function
function hash_and_salt(text, salt){
  debugger;
  input_to_salt = text + salt;
  salted_hash = hash(input_to_salt);
  return salted_hash;
}

//show input
function show_input(){
  let user = document.forms["login_form"]["user"].value;
  let pass = document.forms["login_form"]["password"].value;
  let secret = hash_and_salt(pass, user);
  alert("username: " + user + ", secret(should not match your password input): " + secret);
}
