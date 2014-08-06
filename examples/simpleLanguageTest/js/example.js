var startTime = (new Date()).getTime();
var messageHolder;

function getURLParameter(paramName)
{
	return decodeURIComponent((new RegExp('[?|&]' + paramName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
};

var currentSpecifiedLanguage = getURLParameter('lang');

function languageLoadingDone(successful)
{
	if ((typeof successful === 'boolean') && (successful !== null) && (successful === true))
	{
		var loadTime = (new Date()).getTime() - startTime;
		window.document.title = messageHolder.getValue('title');
		var languageSelectionTitle = document.getElementById('languageSelectionTitle');
		var languageSelection = document.getElementById('languageSelection');
		var translationWarning = document.getElementById('translationWarning');
		var versionTitle = document.getElementById('versionTitle');
		var versionContent = document.getElementById('versionContent');
		var title = document.getElementById('title');
		var description = document.getElementById('description');
		var pages = document.getElementById('pages');
		if ((typeof languageSelectionTitle !== 'undefined') && (languageSelectionTitle !== null))
		{
			languageSelectionTitle.innerHTML = messageHolder.getValue('showPageIn');
		}
		if ((typeof languageSelection !== 'undefined') && (languageSelection !== null))
		{
			if ((typeof currentSpecifiedLanguage === 'string') && (currentSpecifiedLanguage !== null) && (currentSpecifiedLanguage.trim().length > 0))
			{
				languageSelection.value = currentSpecifiedLanguage;
			}
		}
		if ((typeof translationWarning !== 'undefined') && (translationWarning !== null))
		{
			translationWarning.innerHTML = messageHolder.getValue('translationWarning');
		}
		if ((typeof title !== 'undefined') && (title !== null))
		{
			title.innerHTML = messageHolder.getValue('title');
		}
		if ((typeof versionTitle !== 'undefined') && (versionTitle !== null))
		{
			versionTitle.innerHTML = messageHolder.getValue('versionTitle');
		}
		if ((typeof versionContent !== 'undefined') && (versionContent !== null))
		{
			versionContent.innerHTML = window.jsTalks.getAppName() + ' v' + window.jsTalks.getVersion();
		}
		if ((typeof description !== 'undefined') && (description !== null))
		{
			description.innerHTML = messageHolder.getValue('description');
		}
		if ((typeof pages !== 'undefined') && (pages !== null))
		{
			var pageCount = 2;
			
			
			if (pageCount > 0)
			{
				var tmpKeyName = '';
				var pagesHtml = '';
				for (var n=0; n<pageCount; n++)
				{
					tmpKeyName = 'pages_' + (n + 1);
					pagesHtml += '<div>';
					pagesHtml += '<h2>' + messageHolder.getValue(tmpKeyName + '_title') + '</h2>';
					pagesHtml += '<div>' + messageHolder.getValue(tmpKeyName + '_description').replaceAll('{0}', '' + loadTime) + '</div>';
					pagesHtml += '</div>';
				}
				pages.innerHTML = pagesHtml;
			}
		}
	}
	else
	{
		window.console.error('Failed to load language file.');
	}
};

function changeLanguage(preferedLanguageCode)
{
	if ((typeof preferedLanguageCode === 'string') && (preferedLanguageCode !== null) && (preferedLanguageCode.trim().length > 0))
	{
		window.location.replace('index.html?lang=' + preferedLanguageCode);
	}
	else
	{
		window.location.replace('index.html');
	}
};

messageHolder = window.jsTalks.loadLanguageConstants(currentSpecifiedLanguage, 'js/i18n/', 'constants', '.js', languageLoadingDone);