JsTalks
=======

JsTalks is a JavaScript inernationalization tool.
Any JavaScript web-application that uses this tool will be able to be completly internationalized.

This tool will work while hosting your site from a web-server or running the files locally.



How To Use
==========

Include the <b>stringUtils.js</b>, <b>commonUtils.js</b> and <b>jsTalks.js</b> files in folder <b>js/jsTalks</b>.

<b>Language File (base - js/i18n/messages.js)</b>
<br />
window.jsTalks.PRIVATE.loadedData = {
<br />
&nbsp;&nbsp;&nbsp;&nbsp;"welcomeQuestion": "Hi, how are you?",
<br />
&nbsp;&nbsp;&nbsp;&nbsp;"replyOptions": [
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"I'm good",
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Not bad",
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Ok",
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Not so good",
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Terrible"
<br />
&nbsp;&nbsp;&nbsp;&nbsp;]
<br />
}

<b>HTML File</b>
<br />
&lt;!DOCTYPE html&gt;
<br />
&lt;html&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;head&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- IE8 requires this to expose the JSON object. -->
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you don't care about IE8, you can ommit this meta tag. -->
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta http-equiv="X-UA-Compatible" content="IE=EDGE" /&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" language="javascript" src="js/jsTalks/stringUtils.js"&gt;&lt;/script&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" language="javascript" src="js/jsTalks/commonUtils.js"&gt;&lt;/script&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" language="javascript" src="js/jsTalks/jsTalks.js"&gt;&lt;/script&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" language="javascript" src="js/main.js"&gt;&lt;/script&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/head&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;body&gt;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/body&gt;
<br />
&lt;/html&gt;

<b>JavaScript File (js/main.js)</b>
<br />
var i18nMessages = null;
<br />
<br />
function i18nMessagesInitialized(successful)
<br />
{
<br />
&nbsp;&nbsp;&nbsp;&nbsp;if ((successful === true) && i18nMessages.loaded)
<br />
&nbsp;&nbsp;&nbsp;&nbsp;{
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var options = null;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var tmpOptionIndex = 0;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var tmpOptionValueName = 'replyOptions_' + (tmpOptionIndex + 1);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var tmpOption = i18nMessages.getValue(tmpOptionValueName);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while ((tmpOption !== null) && (tmpOption.trim().length > 0))
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (options === null)
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options = tmpOption;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options += ', ' + tmpOption;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tmpOptionIndex++;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tmpOptionValueName = 'replyOptions_' + (tmpOptionIndex + 1);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tmpOption = i18nMessages.getValue(tmpOptionValueName);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prompt(i18nMessages.getValue('welcomeQuestion'), options);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;}
<br />
};
<br />
<br />
i18nMessages = window.jsTalks.loadLanguageConstants(null, 'js/i18n/', 'messages', '.js', i18nMessagesInitialized);
