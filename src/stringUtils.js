

/**
 * This function will escape any REGEX special characters from the specified String.
 * 
 * @param str
 * The String to escape all REGEX special characters from.
 * 
 * @return
 * The escaped String.
 * */
function escapeRegExp(str)
{
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};


/* *********************
 ** CUSTOM PROTOTYPES **
 * *********************/
if ((!String.prototype.startsWith) || (typeof String.prototype.startsWith != 'function'))
{
	/**
	 * This will determine if this String starts with the specified content.
	 * */
	String.prototype.startsWith = function (str)
	{
		return this.slice(0, str.length) == str;
	};
};

if ((!String.prototype.endsWith) || (typeof String.prototype.endsWith != 'function'))
{
	/**
	 * This will determine if this String ends with the specified content.
	 * */
	String.prototype.endsWith = function (str)
	{
		return this.slice(-str.length) == str;
	};
};

if ((!String.prototype.replaceAll) || (typeof String.prototype.replaceAll != 'function'))
{
	/**
	 * This will replace all instances of the specified "find" String with the
	 * specified "replace" String.
	 * 
	 * @param find
	 * The String to look for.
	 * @param replacement
	 * The String to replace all found instances with.
	 * 
	 * @return
	 * The newly created String.
	 * */
	String.prototype.replaceAll=function(find, replacement)
	{
		return this.replace(new RegExp(escapeRegExp(find), 'g'), replacement);
	};
}
if ((!String.prototype.trim) || (typeof String.prototype.trim != 'function'))
{
	/**
	 * This will trim/remove any white-space characters from the start & end of the
	 * String this is being run on and then return that new String.
	 * 
	 * @return
	 * The newly created String.
	 * */
	String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}
if ((!String.prototype.ltrim) || (typeof String.prototype.ltrim != 'function'))
{
	/**
	 * This will trim/remove any white-space characters from the start of the String
	 * this is being run on and then return that new String.
	 * 
	 * @return
	 * The newly created String.
	 * */
	String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
}
if ((!String.prototype.rtrim) || (typeof String.prototype.rtrim != 'function'))
{
	/**
	 * This will trim/remove any white-space characters from the end of the String
	 * this is being run on and then return that new String.
	 * 
	 * @return
	 * The newly created String.
	 * */
	String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
}
if ((!String.prototype.fulltrim) || (typeof String.prototype.fulltrim != 'function'))
{
	/**
	 * This will trim/remove any white-space characters from the String this is
	 * being run on and then return that new String.
	 * 
	 * @return
	 * The newly created String.
	 * */
	String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}
if ((!String.prototype.startsWith) || (typeof String.prototype.startsWith != 'function'))
{
	/**
	 * This will determine if the String this is being run on starts with the
	 * specified String.
	 * 
	 * @param str
	 * The String to look for.
	 * 
	 * @return
	 * TRUE if this String starts with the specified String.
	 * */
	String.prototype.startsWith = function (str){
		if ((typeof str !== 'undefined') && (str !== null))
		{
			return this.slice(0, str.length) == str;
		}
		return false;
	};
}
if ((!String.prototype.endsWith) || (typeof String.prototype.endsWith != 'function'))
{
	/**
	 * This will determine if the String this is being run on ends with the
	 * specified String.
	 * 
	 * @param str
	 * The String to look for.
	 * 
	 * @return
	 * TRUE if this String ends with the specified String.
	 * */
	String.prototype.endsWith = function (str){
		if ((typeof str !== 'undefined') && (str !== null))
		{
			return this.slice(-str.length) == str;
		}
		return false;
	};
}
if ((!String.prototype.multiSplit) || (typeof String.prototype.multiSplit != 'function'))
{
	/**
	 * This function will split the contents of this String into entries using the
	 * characters in the input-separator character array as separation characters.
	 * 
	 * @param inputSeparatorChars
	 * This can be either a String or an Array of characters.
	 * Each character can each be used to split the input String.
	 * 
	 * @return
	 * The Array of Strings that this String has been split into.
	 * */
	String.prototype.multiSplit = function(inputSeparatorChars){
		if ((typeof inputSeparatorChars !== 'undefined') && (inputSeparatorChars !== null))
		{
			var separatorCharArray = null;
			if (typeof inputSeparatorChars === 'string')
			{
				// Split the input-separator String into a character array.
				var separatorCharArray = new Array();
				for (var n=0; n<inputSeparatorChars.length; n++)
				{
					separatorCharArray[n] = inputSeparatorChars.charAt(n);
				}
			}
			else if (typeof inputSeparatorChars === 'object')
			{
				separatorCharArray = inputSeparatorChars;
			}
			if (separatorCharArray !== null)
			{
				var splitEntries = new Array();
				var tmpString = '';
				var tmpFoundSeparator = false;
				for (var n=0; n<this.length; n++)
				{
					tmpFoundSeparator = false;
					for (var k=0; k<separatorCharArray.length; k++)
					{
						if (this.charAt(n) === separatorCharArray[k].charAt(0))
						{
							tmpFoundSeparator = true;
							break;
						}
					}
					if (tmpFoundSeparator === false)
					{
						tmpString += this.charAt(n);
					}
					else
					{
						splitEntries.push(tmpString);
						tmpString = '';
					}
				}
				if (tmpString.length > 0)
				{
					splitEntries.push(tmpString);
				}
				return splitEntries;
			}
		}
		return null;
	};
}
