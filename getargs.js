/* getargs.js - Copyright (c) 2018, Hellsh Ltd. */

if(!("getargs" in window.location))
{
	(function()
	{
		var getargs = undefined;
		Object.defineProperty(window.location, "getargs",
		{
			get: function()
			{
				if(getargs === undefined)
				{
					getargs = {};
					var searchArr = window.location.search.replace("?", "").split("&");
					for(var i in searchArr)
					{
						var varArr = searchArr[i].split("=");
						getargs[decodeURIComponent(varArr[0])] = (varArr.length == 2 ? decodeURIComponent(varArr[1]) : "");
					}
				}
				return getargs;
			},
			set: function(newval)
			{
				getargs = newval;
				var searchArr = [];
				for(var key in getargs)
				{
					searchArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(getargs[key]));
				}
				window.location.search = searchArr.join("&");
			}
		});
	})();
}
else
{
	console.error("getargs.js failed to load: window.location.getargs is already defined.");
}
