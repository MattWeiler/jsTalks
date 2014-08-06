/*
 * JavaScript Talks
 * ----------------
 * JavaScript Talks (jsTalks) is a JavaScript utility which allows for
 * easy internationalization in any JavaScript application.
 * 
 * How it Works:
 *    The file loading will work when running on a HTTP/HTTPS server or
 *    if running as a local file.
 * 
 *    When running on a HTTP/HTTPS server, a simple HTTP GET operation is
 *    performed to retrieve the contents of the file.
 * 
 *    When running as a local file, the internationalized file(s) are loaded
 *    by injecting a "script" tag and then extracting the contents of the
 *    JSON array using simple JavaScript.
 *    This must be done this way since cross-domain scripting is not
 *    supported by browsers for reasons of security.
 * 
 * How To Use:
 *    1) Ensure that you include the below scripts in your HTML page.
 *       - jsTalks/stringUtils.js
 *       - jsTalks/commonUtils.js
 *       - jsTalks/jsTalks.js
 *    2) Create a base language file containing all of your
 *       internationalizable content.
 *       The content of this created file must be valid JavaScript.
*        The JSON data must be stored as a valid JSON object applied to the
*        JavaScript variable "window.jsTalks.PRIVATE.loadedData".
 *    3) For each supported language, just copy the base language file and
 *       rename the copied version.
 *       Ex:
 *          Assuming the base file is called "messages.js", the German file
 *          will be called "messages_de.js".
 *    4) Call the "window.jsTalks.loadLanguageConstants" function which will
 *       return an object containing helper methods.
 *       The main helper method will be "getValue(...)" which will retrieve
 *       the current users configured language equivalent of the base language.
 *       
 *       Since the loading of the file(s) is done asynchronously, a callback
 *       function must be provided which will be fired/executed once the
 *       correct file has been loaded.
 *       
 *       Please see the below JavaDoc for this method for more details.
 * 
 * -------------
 * -- EXAMPLE --
 * -------------
 *    Sample Internationalized File:
 *       --------------------------------------------
 *      | window.jsTalks.PRIVATE.loadedData = {      |
 *      |     "var1": "value1",                      |
 *      |     "var2": "value2",                      |
 *      |     "array1": [                            |
 *      |         "array1Value1",                    |
 *      |         "array1Value2",                    |
 *      |         "array1Value3"                     |
 *      |     ],                                     |
 *      |     "array2": [                            |
 *      |         {                                  |
 *      |             "var1": "array2Value1Var1",    |
 *      |             "var2": "array2Value1Var2",    |
 *      |             "var3": "array2Value1Var3",    |
 *      |             "var4": "array2Value1Var4"     |
 *      |         },                                 |
 *      |         {                                  |
 *      |             "var1": "array2Value2Var1",    |
 *      |             "var2": "array2Value2Var2"     |
 *      |         }                                  |
 *      |     ]                                      |
 *      |}                                           |
 *       --------------------------------------------
 * 
 *    As Stored in JsTalks Array:
 *      var1 = value1
 *      var2 = value2
 *      array1_1       =  array1Value1
 *      array1_2       =  array1Value2
 *      array1_3       =  array1Value3
 *      array2_1_var1  =  array2Value1Var1
 *      array2_1_var2  =  array2Value1Var2
 *      array2_1_var3  =  array2Value1Var3
 *      array2_1_var4  =  array2Value1Var4
 *      array2_2_var1  =  array2Value2Var1
 *      array2_2_var2  =  array2Value2Var2
 * 
 * @author Matthew Weiler (mattweiler@hotmail.com)
 * */

/* ********************
 ** PUBLIC VARIABLES **
 * ********************/
window.jsTalks = new Object();

/* *********************
 ** PRIVATE VARIABLES **
 * *********************/
window.jsTalks.PRIVATE = new Object();
window.jsTalks.PRIVATE.CONSTANTS = new Object();
/**
 * This will store the name for JsTalks.
 * */
window.jsTalks.PRIVATE.CONSTANTS.appName = 'JsTalks';
/**
 * This will store the current version of JsTalks.
 * */
window.jsTalks.PRIVATE.CONSTANTS.version = '1.0.0.0';
/**
 * This will store the total number of milliseconds to wait for a
 * JS file to finish being loaded into the DOM before deeming it
 * not valid.
 * */
window.jsTalks.PRIVATE.CONSTANTS.loadLanguageConstants_localFileRetryDelay = 100;
/**
 * This will store the boolean flag to denote if the current source
 * of the current webpage is on a server or not.
 * */
window.jsTalks.PRIVATE.CONSTANTS.isRunningOnServer = document.URL.toLowerCase().startsWith('http://') || document.URL.toLowerCase().startsWith('https://');
/**
 * This stores the name of the flag to be used when loading the base
 * translated file.
 * */
window.jsTalks.PRIVATE.CONSTANTS.baseFile = 'base';

/* ********************
 ** PUBLIC FUNCTIONS **
 * ********************/
/**
 * This will get the name for JsTalks.
 * 
 * @return
 * The name for JsTalks.
 * */
window.jsTalks.getAppName = function()
{
	return window.jsTalks.PRIVATE.CONSTANTS.appName;
};

/**
 * This will get the current version of JsTalks.
 * 
 * @return
 * The current version of JsTalks.
 * */
window.jsTalks.getVersion = function()
{
	return window.jsTalks.PRIVATE.CONSTANTS.version;
};

/**
 * This function will load all language constant values from the server
 * based on the language code specified.
 * Any previously loaded language constants will be removed prior to
 * loading.
 * 
 * @param languageCode
 * The language code to load for.
 * If this is null or empty, the browsers language will be detected.
 * @param languagesRelPath
 * The relative path of the languages folder.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFilename
 * The base name of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFileExt
 * The filename extension of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param loadingDoneFunction
 * The JavaScript function that is to be fired/executed once the language
 * file specified is loaded.
 * Function Parameters:
 *    1) A boolean flag to denote if the loading was successful.
 * 
 * @return
 * The JavaScript object that will hold the actual JsTalks content.
 * Within this object there will exist several objects:
 *   - getValue(keyName) [function]
 *     This function can be used to get the translated value for the specified key.
 *   - loaded [variable]
 *     This variable will contain the boolean state of if the translations have been loaded.
 * */
window.jsTalks.loadLanguageConstants = function(languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction)
{
	if ((typeof languagesRelPath === 'string') && (languagesRelPath !== null) && (languagesRelPath.trim().length > 0))
	{
		if ((typeof languagesFilename === 'string') && (languagesFilename !== null) && (languagesFilename.trim().length > 0))
		{
			if ((typeof languagesFileExt !== 'string') || (languagesFileExt === null) || (languagesFileExt.trim().length === 0))
			{
				languagesFileExt = '';
			}
			var messageHolder = new Object();
			window.jsTalks.PRIVATE.loadLanguageConstants(messageHolder, languageCode, true, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
			return messageHolder;
		}
		else
		{
			window.console.error('(window.jsTalks.loadLanguageConstants) Invalid language file name.');
		}
	}
	else
	{
		window.console.error('(window.jsTalks.loadLanguageConstants) Invalid language folder relative path.');
	}
	return null;
};

/* *********************
 ** PRIVATE FUNCTIONS **
 * *********************/
/**
 * This function will load all language constant values from the server
 * based on the language code specified.
 * 
 * @param messageHolder
 * The JavaScript object that will hold the actual JsTalks content.
 * Within this object there will exist several objects:
 *   - getValue(keyName) (function)
 *     This function can be used to get the translated value for the specified key.
 *   - loaded (variable)
 *     This variable will contain the boolean state of if the translations have been loaded.
 *   - jsTalks (array)
 *     This array will contain all of the translated messages.
 * @param languageCode
 * The language code to load for.
 * If this is null or empty, the browsers language will be detected.
 * @param languagesRelPath
 * The relative path of the languages folder.
 * @param languagesFilename
 * The base name of the language files.
 * @param languagesFileExt
 * The filename extension of the language files.
 * @param loadingDoneFunction
 * The JavaScript function that is to be fired/executed once the language
 * file specified is loaded.
 * Function Parameters:
 *    1) A boolean flag to denote if the loading was successful.
 * */
window.jsTalks.PRIVATE.loadLanguageConstants = function(messageHolder, languageCode, clearFirst, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction)
{
	if ((typeof clearFirst !== 'undefined') && (clearFirst !== null) && (clearFirst === true))
	{
		messageHolder.loaded = false;
		messageHolder.jsTalks = new Array();
		messageHolder.getValue = function(keyName) {
			return window.jsTalks.PRIVATE.getValue(messageHolder.jsTalks, keyName);
		}
	}
	var languageCodeStr = '';
	if ((typeof languageCode === 'string') && (languageCode !== null) && (languageCode.trim().length > 0) && (languageCode.trim().toLowerCase() === window.jsTalks.PRIVATE.CONSTANTS.baseFile))
	{
		languageCode = null;
	}
	else
	{
		if ((typeof languageCode === 'string') && (languageCode !== null) && (languageCode.trim().length > 0))
		{
			languageCodeStr = '_' + languageCode;
		}
		else
		{
			languageCode = detectUserLanguage();
			languageCodeStr = '_' + languageCode;
		}
	}
	// If this is running on an actual server, perform an AJAX GET request.
	if (window.jsTalks.PRIVATE.CONSTANTS.isRunningOnServer === true)
	{
		window.jsTalks.PRIVATE.loadLanguageConstants_server(messageHolder, languageCodeStr, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
	}
	// If this is running on a local file system, perform the script loading method.
	else
	{
		window.jsTalks.PRIVATE.loadLanguageConstants_local(messageHolder, languageCodeStr, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
	}
};

/**
 * This function will load all language constant values from the server
 * based on the language code specified.
 * 
 * @param messageHolder
 * The JavaScript object that will hold the actual JsTalks content.
 * Within this object there will exist several objects:
 *   - getValue(keyName) (function)
 *     This function can be used to get the translated value for the specified key.
 *   - loaded (variable)
 *     This variable will contain the boolean state of if the translations have been loaded.
 *   - jsTalks (array)
 *     This array will contain all of the translated messages.
 * @param languageCodeStr
 * The language code string that is to be used for this try.
 * @param languageCode
 * The language code to load for.
 * If this is null or empty, the browsers language will be detected.
 * @param languagesRelPath
 * The relative path of the languages folder.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFilename
 * The base name of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFileExt
 * The filename extension of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param loadingDoneFunction
 * The JavaScript function that is to be fired/executed once the language
 * file specified is loaded.
 * Function Parameters:
 *    1) A boolean flag to denote if the loading was successful.
 * */
window.jsTalks.PRIVATE.loadLanguageConstants_server = function(messageHolder, languageCodeStr, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction)
{
	var languageFileRelativePath = languagesRelPath + languagesFilename + languageCodeStr + languagesFileExt;
	loadXMLDoc(languageFileRelativePath, function(serverResponseCode, fileContent){
		var constantsParsed = false;
		if ((typeof serverResponseCode !== 'undefined') && (serverResponseCode !== null))
		{
			if (serverResponseCode === 200)
			{
				if ((typeof fileContent !== 'undefined') && (fileContent !== null))
				{
					if (fileContent.startsWith('window.jsTalks.PRIVATE.loadedData = '))
					{
						fileContent = fileContent.substr('window.jsTalks.PRIVATE.loadedData = '.length);
					}
					if (window.jsTalks.PRIVATE.parseLoadedJson(messageHolder.jsTalks, null, JSON.parse(fileContent)) > 0)
					{
						window.console.info('(jsTalks.PRIVATE.loadLanguageConstants_server) Successfully loaded file: ' + languageFileRelativePath);
						constantsParsed = true;
					}
					else
					{
						window.console.error('(jsTalks.PRIVATE.loadLanguageConstants_server) Failed to load file: ' + languageFileRelativePath);
					}
				}
				else
				{
					window.console.error('(jsTalks.PRIVATE.loadLanguageConstants_server) Invalid file contents.');
				}
			}
			else
			{
				window.console.warn('(jsTalks.PRIVATE.loadLanguageConstants_server) Server returned response code ' + serverResponseCode + ' for file: ' + languageFileRelativePath);
			}
		}
		else
		{
			window.console.warn('(jsTalks.PRIVATE.loadLanguageConstants_server) Invalid server response code.');
		}
		if (constantsParsed === true)
		{
			messageHolder.loaded = true;
			if ((typeof loadingDoneFunction === 'function') && (loadingDoneFunction !== null))
			{
				loadingDoneFunction(true);
			}
		}
		else
		{
			window.jsTalks.PRIVATE.tryNextLanguageFile(messageHolder, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
		}
	}, true);
};

/**
 * This function will load all language constant values from the local
 * file system based on the language code specified.
 * 
 * @param messageHolder
 * The JavaScript object that will hold the actual JsTalks content.
 * Within this object there will exist several objects:
 *   - getValue(keyName) (function)
 *     This function can be used to get the translated value for the specified key.
 *   - loaded (variable)
 *     This variable will contain the boolean state of if the translations have been loaded.
 *   - jsTalks (array)
 *     This array will contain all of the translated messages.
 * @param languageCodeStr
 * The language code string that is to be used for this try.
 * @param languageCode
 * The language code to load for.
 * If this is null or empty, the browsers language will be detected.
 * @param languagesRelPath
 * The relative path of the languages folder.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFilename
 * The base name of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFileExt
 * The filename extension of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param loadingDoneFunction
 * The JavaScript function that is to be fired/executed once the language
 * file specified is loaded.
 * Function Parameters:
 *    1) A boolean flag to denote if the loading was successful.
 * */
window.jsTalks.PRIVATE.loadLanguageConstants_local = function(messageHolder, languageCodeStr, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction)
{
	var languageFileRelativePath = languagesRelPath + languagesFilename + languageCodeStr + languagesFileExt;
	var dynamicallyLoadedScript = document.createElement('script');
	dynamicallyLoadedScript.setAttribute('type', 'text/javascript');
	dynamicallyLoadedScript.setAttribute('src', languageFileRelativePath);
	document.head.appendChild(dynamicallyLoadedScript);
	window.console.debug('(jsTalks.PRIVATE.loadLanguageConstants_local) Trying to load data from file: ' + languageFileRelativePath);
	setTimeout(function(){
		try
		{
			if ((typeof window.jsTalks.PRIVATE.loadedData !== 'undefined') && (window.jsTalks.PRIVATE.loadedData !== null))
			{
				if (window.jsTalks.PRIVATE.parseLoadedJson(messageHolder.jsTalks, null, window.jsTalks.PRIVATE.loadedData) > 0)
				{
					window.console.info('(jsTalks.PRIVATE.loadLanguageConstants_local) Successfully loaded file: ' + languageFileRelativePath);
					messageHolder.loaded = true;
					if ((typeof loadingDoneFunction === 'function') && (loadingDoneFunction !== null))
					{
						loadingDoneFunction(true);
					}
				}
				else
				{
					window.console.warn('(jsTalks.PRIVATE.loadLanguageConstants_local) Failed to load file: ' + languageFileRelativePath);
					window.jsTalks.PRIVATE.tryNextLanguageFile(messageHolder, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
				}
			}
			else
			{
				window.console.warn('(jsTalks.PRIVATE.loadLanguageConstants_local) Failed to load file: ' + languageFileRelativePath);
				window.jsTalks.PRIVATE.tryNextLanguageFile(messageHolder, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
			}
		}
		catch (err)
		{
			window.console.error('(jsTalks.PRIVATE.loadLanguageConstants_local) Failed to find data from file: ' + languageFileRelativePath);
			window.console.error(err);
			window.jsTalks.PRIVATE.tryNextLanguageFile(messageHolder, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
		}
	}, window.jsTalks.PRIVATE.CONSTANTS.loadLanguageConstants_localFileRetryDelay);
};

/**
 * This function will load all language constant values from the local
 * file system based on the next available language code.
 * 
 * @param messageHolder
 * The JavaScript object that will hold the actual JsTalks content.
 * Within this object there will exist several objects:
 *   - getValue(keyName) (function)
 *     This function can be used to get the translated value for the specified key.
 *   - loaded (variable)
 *     This variable will contain the boolean state of if the translations have been loaded.
 *   - jsTalks (array)
 *     This array will contain all of the translated messages.
 * @param languageCode
 * The language code to load for.
 * If this is null or empty, the browsers language will be detected.
 * @param languagesRelPath
 * The relative path of the languages folder.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFilename
 * The base name of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param languagesFileExt
 * The filename extension of the language files.
 * If this is null or empty, the default value will be loaded.
 * @param loadingDoneFunction
 * The JavaScript function that is to be fired/executed once the language
 * file specified is loaded.
 * Function Parameters:
 *    1) A boolean flag to denote if the loading was successful.
 * */
window.jsTalks.PRIVATE.tryNextLanguageFile = function(messageHolder, languageCode, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction)
{
	// If the language code that was just used is not empty then if
	// it contains both the country and language code, strip away
	// the country code.
	if ((typeof languageCode === 'string') && (languageCode !== null) && (languageCode.trim().length > 0))
	{
		var dashIndex = languageCode.indexOf('-');
		if (dashIndex < 0)
		{
			dashIndex = languageCode.indexOf('_');
		}
		// If the language code used contains both the country and
		// language code, strip away the country code.
		if (dashIndex > 0)
		{
			window.jsTalks.PRIVATE.loadLanguageConstants(messageHolder, languageCode.substring(0, dashIndex), false, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
		}
		// If the language code used does not contain both the
		// country and language code, then just try the default
		// language file.
		else
		{
			window.jsTalks.PRIVATE.loadLanguageConstants(messageHolder, window.jsTalks.PRIVATE.CONSTANTS.baseFile, false, languagesRelPath, languagesFilename, languagesFileExt, loadingDoneFunction);
		}
	}
	else
	{
		if ((typeof loadingDoneFunction === 'function') && (loadingDoneFunction !== null))
		{
			loadingDoneFunction(false);
		}
	}
};

/**
 * This function will parse the loaded JSON object and load the
 * found key/value pairs into the specified jsTalks array.
 * 
 * @param jsTalksArray
 * The array which will contain all of the translated values.
 * @param jsonRelPath
 * The relative path so far of the JSON iterating.
 * This should be null the first time it is called; it will
 * recursively call itself at which point this parameter will
 * have a value.
 * @param jsonObj
 * The JSON object extracted from the language file.
 * 
 * @return
 * A boolean flag to denote if the file contents were parsed and at least 1
 * constant value was extracted.
 * */
window.jsTalks.PRIVATE.parseLoadedJson = function(jsTalksArray, jsonRelPath, jsonObj)
{
	var constantsLoaded = 0;
	if ((typeof jsonObj !== 'undefined') && (jsonObj !== null))
	{
		// Ensure that the JSON relative path is not null.
		if ((typeof jsonRelPath !== 'string') || (jsonRelPath === null))
		{
			jsonRelPath = '';
		}
		
		// This must be a JSON array ...
		if (typeof jsonObj.length !== 'undefined')
		{
			for (var n=0; n<jsonObj.length; n++)
			{
				var tmpArrayValue = jsonObj[n];
				
				// Add the index of this array element to the temp JSON relative path.
				var tmpJsonRelPath = jsonRelPath;
				if (tmpJsonRelPath.length > 0)
				{
					tmpJsonRelPath += '_';
				}
				tmpJsonRelPath += '' + (n + 1);
				
				// This JSON array element must be a String ...
				if (typeof tmpArrayValue === 'string')
				{
					constantsLoaded += window.jsTalks.PRIVATE.addJsTalksEntry(jsTalksArray, tmpJsonRelPath, tmpArrayValue);
				}
				// This JSON array element must be an object ...
				else
				{
					constantsLoaded += window.jsTalks.PRIVATE.parseLoadedJson(jsTalksArray, tmpJsonRelPath, tmpArrayValue);
				}
			}
		}
		// This must be a JSON object ...
		else
		{
			for (var tmpKey in jsonObj)
			{
				if (jsonObj.hasOwnProperty(tmpKey))
				{
					var tmpValue = jsonObj[tmpKey];
					
					// Add the name of this element to the temp JSON relative path.
					var tmpJsonRelPath = jsonRelPath;
					if (tmpJsonRelPath.length > 0)
					{
						tmpJsonRelPath += '_';
					}
					tmpJsonRelPath += '' + tmpKey.toLowerCase();
					
					// This must be a JSON value ...
					if ((typeof tmpValue === 'string'))
					{
						constantsLoaded += window.jsTalks.PRIVATE.addJsTalksEntry(jsTalksArray, tmpJsonRelPath, tmpValue);
					}
					// This must be a JSON object ...
					else
					{
						constantsLoaded += window.jsTalks.PRIVATE.parseLoadedJson(jsTalksArray, tmpJsonRelPath, tmpValue);
					}
				}
			}
		}
	}
	else
	{
		window.console.warn('(window.jsTalks.PRIVATE.parseLoadedJson) Invalid file contents.');
	}
	return constantsLoaded;
};

/**
 * This function will add the specified JSON value to the specified
 * jsTalks array using the specified jsTalks key name.
 * 
 * @param jsTalksArray
 * The array which will contain all of the translated values.
 * @param jsTalksKeyName
 * The name of the key to add to the jsTalks array.
 * @param jsonValue
 * The actual value to insert into the jsTalks array.
 * 
 * @return 
 * The number of elements inserted into the jsTalks array.
 * */
window.jsTalks.PRIVATE.addJsTalksEntry = function(jsTalksArray, jsTalksKeyName, jsonValue)
{
	var tmpExistingValue = jsTalksArray[jsTalksKeyName];
	if ((typeof tmpExistingValue === 'undefined') || (tmpExistingValue === null) || (tmpExistingValue.length === 0))
	{
		jsTalksArray[jsTalksKeyName] = jsonValue;
		return 1;
	}
	return 0;
};

/**
 * This function will load the value for the specified loaded
 * language constant.
 * 
 * @param messageHolder
 * The JavaScript object that will hold the actual JsTalks content.
 * An Array, with name "jsTalks", and will be created within this
 * JavaScript object for which each value will be the key from the
 * translated file and the translated value will reside within a
 * variable called "value".
 * @param keyName
 * The name of the language constants key for which to return
 * the value.
 * 
 * @return
 * The value for the specified loaded language constant.
 * If no matching value is found an empty String will be
 * returned.
 * */
window.jsTalks.PRIVATE.getValue = function(jsTalksArray, keyName)
{
	if ((typeof keyName !== 'undefined') && (keyName !== null) && (keyName.trim().length > 0))
	{
		if ((typeof jsTalksArray !== 'undefined') && (jsTalksArray !== null))
		{
			keyName = keyName.trim().toLowerCase()
			var languageConstantValue = jsTalksArray[keyName];
			if ((typeof languageConstantValue !== 'undefined') && (languageConstantValue !== null) && (languageConstantValue.length > 0))
			{
				return languageConstantValue;
			}
		}
		else
		{
			window.console.warn('(jsTalks.PRIVATE.getValue) Language constants have not yet been loaded.');
		}
	}
	else
	{
		window.console.warn('(jsTalks.PRIVATE.getValue) Invalid key name.');
	}
	return '';
};
