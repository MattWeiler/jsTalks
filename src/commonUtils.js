// Ensure that window.console.* functions exist.
// This is needed for IE8.
// IE8 does not create the window.console object
// until the developer console is open.
if (typeof window.console === 'undefined')
{
	window.console = new Object();
}
if (typeof window.console.log === 'undefined')
{
	window.console.log = function() {};
}
if (typeof window.console.error === 'undefined')
{
	window.console.error = function() {};
}
if (typeof window.console.warn === 'undefined')
{
	window.console.warn = function() {};
}
if (typeof window.console.info === 'undefined')
{
	window.console.info = function() {};
}
if (typeof window.console.debug === 'undefined')
{
	window.console.debug = function() {};
}


/**
 * This will store the language code override that should be
 * used, regardless of the users browser configuration.
 * If this code is not valid, the default will be used.
 * */
var detectUserLanguageCodeOverride = '';

/**
 * This function will detect which language the user is using based
 * on their browser settings.
 * 
 * @return
 * The language code of the users browser.
 * */
function detectUserLanguage()
{
	if ((typeof detectUserLanguageCodeOverride !== 'undefined') && (detectUserLanguageCodeOverride !== null) && (detectUserLanguageCodeOverride.trim().length > 0))
	{
		return detectUserLanguageCodeOverride.trim();
	}
	var userLang = navigator.language || navigator.userLanguage;
	if ((typeof userLang !== 'undefined') && (userLang !== null))
	{
		userLang = userLang.trim();
		if (userLang.trim().length > 0)
		{
			return userLang;
		}
	}
	return null;
};

/**
 * This function will load the contents of the specified file from the
 * server.
 * Once loaded, the contents of the file will be passed to the
 * "fileLoadedFunction" function specified.
 * 
 * @param relativeFilePath
 * The relative path of the file on the server.
 * This path should be relative to this "commonUtils.js" JavaScript file.
 * @param fileLoadedFunction
 * The function that should be fired once the file is loaded from the server.
 * This function must accept 2 parameters:
 *   1) The server-response status code (200, 404, etc...).
 *   2) The text content of the file.
 * @param forceNew
 * Boolean flag to denote if this request should always force a new call or
 * could it depend on the browser caching the response.
 * 
 * @return
 * true if the request has been sent; false if the request was not sent,
 * likely due to bad inputs.
 * */
function loadXMLDoc(relativeFilePath, fileLoadedFunction, forceNew)
{
	if ((typeof relativeFilePath !== 'undefined') && (relativeFilePath !== null) && (relativeFilePath.length > 0))
	{
		if ((typeof fileLoadedFunction !== 'undefined') && (fileLoadedFunction !== null) && (typeof fileLoadedFunction === 'function'))
		{
			var xmlhttp;
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState === 4)
				{
					var fileContents = null;
					if (xmlhttp.status === 200)
					{
						fileContents = xmlhttp.responseText;
					}
					fileLoadedFunction(xmlhttp.status, fileContents);
				}
			}
			if ((typeof forceNew === 'boolean') && (forceNew !== null) && (true === forceNew))
			{
				if (relativeFilePath.indexOf('?') === -1)
				{
					relativeFilePath += '?';
				}
				relativeFilePath += 'newRequest=' + ((new Date()).getTime());
			}
			xmlhttp.open("GET", relativeFilePath, true);
			xmlhttp.send();
		}
		else
		{
			window.console.error('(loadXMLDoc) Invalid file loaded function.');
		}
	}
	else
	{
		window.console.error('(loadXMLDoc) Invalid relative file path.');
	}
};
