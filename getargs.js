/* getargs.js 1.3 — Copyright (c) 2018, Hellsh Ltd. — https://github.com/hellshltd/getargs.js */

(function()
{
	console.assert(typeof window != "undefined");
	console.assert(!("getargs" in window));
	console.assert("location" in window);
	console.assert(!("getargs" in window));
	var previous_search = window.location.search.toString(), changeHandlers = [],
	changeMonitor = function()
	{
		if(changeHandlers.length == 0)
		{
			return;
		}
		if(window.location.search.toString() != previous_search)
		{
			previous_search = window.location.search.toString();
			for(let i in changeHandlers)
			{
				changeHandlers[i]();
			}
		}
		window.setTimeout(changeMonitor, window.getargs.options.monitorInterval);
	};
	window.getargs = {
		options: {
			"pushState": false,
			"monitorInterval": 200
		},
		searchToObject: function(search)
		{
			let object = {},
			searchArr = search.replace("?", "").split("&");
			for(let i in searchArr)
			{
				let varArr = searchArr[i].split("="), key = decodeURIComponent(varArr[0]);
				if(key == "")
				{
					continue;
				}
				object[key] = (varArr.length == 2 ? decodeURIComponent(varArr[1]) : "");
			}
			return object;
		},
		objectToSearch: function(object)
		{
			let searchArr = [];
			for(let key in object)
			{
				searchArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]));
			}
			return searchArr.join("&");
		},
		fixLinks: function()
		{
			let links = document.querySelectorAll("a[href^='?']");
			for(let i in links)
			{
				if(links[i] instanceof HTMLElement)
				{
					links[i].addEventListener("click", function(event)
					{
						event.preventDefault();
						window.getargs.set(this.getAttribute("href"));
					});
				}
			}
			return window.getargs;
		},
		get: function(key)
		{
			let object = window.getargs.searchToObject(window.location.search.toString());
			if(key !== undefined)
			{
				return object[key];
			}
			return object;
		},
		set: function(key, val)
		{
			let object = {};
			if(val === undefined)
			{
				if(typeof key == "object")
				{
					object = key;
				}
				else if(typeof key == "string")
				{
					object = window.getargs.searchToObject(key);
				}
				else if(key !== undefined)
				{
					console.error("You can't set getargs to", typeof key);
					return;
				}
			}
			else
			{
				object = window.getargs.get();
				object[key] = val;
			}
			return window.getargs.updateSearch(object);
		},
		remove: function(key)
		{
			let object = window.getargs.get();
			delete object[key];
			return window.getargs.updateSearch(object);
		},
		updateSearch: function(object)
		{
			let search = window.getargs.objectToSearch(object);
			if(window.getargs.options.pushState)
			{
				var url = window.location.pathname.toString() + "?" + search, hash = window.location.hash.toString().replace("#", "");
				if(hash != "")
				{
					url += "#" + hash;
				}
				history.pushState({}, document.getElementsByTagName("title")[0].textContent, url);
			}
			else
			{
				window.location.search = search;
			}
			return window.getargs;
		},
		registerChangeHandler: function(func)
		{
			changeHandlers.push(func);
			if(changeHandlers.length == 1)
			{
				changeMonitor();
			}
			return window.getargs;
		},
		unregisterChangeHandler: function(func)
		{
			let i = changeHandlers.indexOf(func);
			if(i != -1)
			{
				changeHandlers.splice(i, 1);
			}
			return window.getargs;
		}
	};
	Object.defineProperty(window.location, "getargs",
	{
		get: function()
		{
			return window.getargs.get();
		},
		set: function(val)
		{
			window.getargs.set(val);
		}
	});
})();
