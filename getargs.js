/* getargs.js - Copyright (c) 2018, Hellsh Ltd. */

console.assert(!("getargsoptions" in window));
console.assert("location" in window);
console.assert(!("getargs" in window.location));

window.getargsoptions = {
	"reload": true /* If set to false, history.pushState will be used to avoid reload. */
};

(function()
{
	var searchToObject = function(search)
	{
		var obj = {},
		searchArr = search.replace("?", "").split("&");
		for(var i in searchArr)
		{
			var varArr = searchArr[i].split("="), key = decodeURIComponent(varArr[0]);
			if(key == "")
			{
				continue;
			}
			obj[key] = (varArr.length == 2 ? decodeURIComponent(varArr[1]) : "");
		}
		return obj;
	},
	getargs;
	Object.defineProperty(window.location, "getargs",
	{
		get: function()
		{
			if(getargs === undefined)
			{
				getargs = searchToObject(window.location.search.toString());
			}
			return getargs;
		},
		set: function(newval)
		{
			if(newval === undefined)
			{
				getargs = {};
			}
			else if(typeof newval == "object")
			{
				getargs = newval;
			}
			else if(typeof newval == "string")
			{
				getargs = searchToObject(newval);
			}
			else
			{
				console.warn("Invalid getargs value:", newval);
				return;
			}
			var searchArr = [];
			for(var key in getargs)
			{
				searchArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(getargs[key]));
			}
			if(window.getargsoptions.reload)
			{
				window.location.search = searchArr.join("&");
			}
			else
			{
				var url = window.location.pathname.toString() + "?" + searchArr.join("&"), hash = window.location.hash.toString().replace("#", "");
				if(hash != "")
				{
					url += "#" + hash;
				}
				history.pushState({}, document.getElementsByTagName("title")[0].textContent, url);
			}
		}
	});
})();
