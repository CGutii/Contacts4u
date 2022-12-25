
const urlBase = 'http://contacts4u.info/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let contactId = null;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

//Add Contact
function addContact()
{
	console.log('Running..');
	let contactFirst = document.getElementById("contactFirst").value;
	let contactLast = document.getElementById("contactLast").value;
	let contactEmail = document.getElementById("contactEmail").value;
	let contactNumber = document.getElementById("contactNumber").value;

	if(contactFirst == "")
	{
		document.getElementById("addContact").innerHTML = "You have an Empty Field";
		return;
	}
	else if(contactLast == "")
	{
		document.getElementById("addContact").innerHTML = "You have an Empty Field";
		return;
	}
	else if(contactEmail == "")
	{
		document.getElementById("addContact").innerHTML = "You have an Empty Field";
		return;
	}
	else if(contactNumber == "")
	{
		document.getElementById("addContact").innerHTML = "You have an Empty Field";
		return;
	}
	else
	{
		let newContact =
		{
			firstName:contactFirst,
			lastName:contactLast,
			email:contactEmail,
			phone:contactNumber,
			userId: userId
		};
		let jsonPayload = JSON.stringify(newContact);
		let url = urlBase + '/AddContact.' + extension;
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()
			{
				// if (this.readyState == 4 && this.status == 200)
				// {
				// 	// document.getElementById("contactSearchResult").innerHTML = "Color(s) has been retrieved";
				// 	let jsonObject = JSON.parse( xhr.responseText );
				// 	console.log(jsonObject);
				// 	for( let i=0; i<jsonObject.results.length; i++ )
				// 	{
				// 		contactList += jsonObject.results[i];
				// 		if( i < jsonObject.results.length - 1 )
				// 		{
				// 			contactList += "<br />\r\n";
				// 		}
				// 	}
				//
				// 	document.getElementsByTagName("p")[0].innerHTML = contactList;
				// }
				if(this.readyState == 4 && this.status == 200)
				{
					let jsonObject = JSON.parse( xhr.responseText );
				}
			};
			xhr.send(jsonPayload);

		}
		catch(err)
		{
			console.log(err.message);
		}

		document.getElementById('contactFirst').value = '';
		document.getElementById('contactLast').value = '';
		document.getElementById('contactEmail').value = '';
		document.getElementById('contactNumber').value = '';


		document.getElementById("addContact-bar").style.visibility = "visible";
		document.getElementById("addContact").innerHTML = "Contact Added!";
	}

}

function registerUser()
{
	console.log('Running..');
	let createFirstName = document.getElementById("createFirstName").value;
	let createLastName = document.getElementById("createLastName").value;
	let createLogin = document.getElementById("createLogin").value;
	let createPassword = document.getElementById("createPassword").value;

	if(createFirstName == "")
	{
		document.getElementById("register-text").innerHTML = "You have an Empty Field";
		return;
	}
	else if(createLastName == "")
	{
		document.getElementById("register-text").innerHTML = "You have an Empty Field";
		return;
	}
	else if(createLogin == "")
	{
		document.getElementById("register-text").innerHTML = "You have an Empty Field";
		return;
	}
	else if(createPassword == "")
	{
		document.getElementById("register-text").innerHTML = "You have an Empty Field";
		return;
	}
	else
	{
		let createUser =
		{
			firstName: createFirstName,
			lastName: createLastName,
			login: createLogin,
			password: createPassword

		};

		let jsonPayload = JSON.stringify(createUser);
		let url = urlBase + '/Register.' + extension;
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()
			{
				// if (this.readyState == 4 && this.status == 200)
				// {
				// 	// document.getElementById("contactSearchResult").innerHTML = "Color(s) has been retrieved";
				// 	let jsonObject = JSON.parse( xhr.responseText );
				// 	console.log(jsonObject);
				// 	for( let i=0; i<jsonObject.results.length; i++ )
				// 	{
				// 		contactList += jsonObject.results[i];
				// 		if( i < jsonObject.results.length - 1 )
				// 		{
				// 			contactList += "<br />\r\n";
				// 		}
				// 	}
				//
				// 	document.getElementsByTagName("p")[0].innerHTML = contactList;
				// }
					if (this.readyState == 4 && this.status == 200)
					{
						let jsonObject = JSON.parse( xhr.responseText );
						console.log(jsonObject);
						if(jsonObject['error'] == "")
						{
							document.getElementById("register-bar").style.visibility = "visible";
							document.getElementById("register-text").innerHTML = "Account Registered";
							document.getElementById('createFirstName').value = "";
							document.getElementById('createLastName').value = "";
							document.getElementById('createLogin').value = "";
							document.getElementById('createPassword').value = "";
							window.location.href = 'http://contacts4u.info';
						}
						else
						{
							document.getElementById("register-bar").style.visibility = "visible";
							document.getElementById("register-text").innerHTML = `${jsonObject['error']}`;

						}

					}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			console.log(err.message);
		}
	}


}

function deleteContact()
{
	// contactId:contactId;
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	console.log(splits);
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		console.log(tokens);
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// Search Contact
function searchContact()
{
	console.log('Searching...');
	let srch = document.getElementById("searchText").value;
	// After user searches, then the edit and delete button will be visible.
	let visible = document.getElementById("btn-visibility").style.visibility = "visible";

	// document.getElementById("contactSearchResult").innerHTML = "";

	let contactList = "";
	console.log(userId);
	console.log(srch);
	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload);
	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// document.getElementById("contactSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject);
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i].firstName + " " + jsonObject.results[i].lastName;
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}


// function addColor()
// {
// 	let newColor = document.getElementById("colorText").value;
// 	document.getElementById("colorAddResult").innerHTML = "";
//
// 	let tmp = {color:newColor,userId,userId};
// 	let jsonPayload = JSON.stringify( tmp );
//
// 	let url = urlBase + '/AddColor.' + extension;
//
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	try
// 	{
// 		xhr.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				document.getElementById("colorAddResult").innerHTML = "Color has been added";
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("colorAddResult").innerHTML = err.message;
// 	}
//
// }

// function searchColor()
// {
// 	let srch = document.getElementById("searchText").value;
// 	document.getElementById("colorSearchResult").innerHTML = "";
//
// 	let colorList = "";
//
// 	let tmp = {search:srch,userId:userId};
// 	let jsonPayload = JSON.stringify( tmp );
//
// 	let url = urlBase + '/SearchColors.' + extension;
//
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	try
// 	{
// 		xhr.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
// 				let jsonObject = JSON.parse( xhr.responseText );
//
// 				for( let i=0; i<jsonObject.results.length; i++ )
// 				{
// 					colorList += jsonObject.results[i];
// 					if( i < jsonObject.results.length - 1 )
// 					{
// 						colorList += "<br />\r\n";
// 					}
// 				}
//
// 				document.getElementsByTagName("p")[0].innerHTML = colorList;
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("colorSearchResult").innerHTML = err.message;
// 	}
//
// }
