# <img src="https://img.shields.io/travis/gonzazoid/sprintf.js.svg"></img> <img src="https://img.shields.io/npm/v/gonzazoid.sprintf.js.svg"></img>
<img src="https://gonzazoid.github.io/strongly_typed.svg"></img>

# sprinf.js

#### sprintf: (pattern: string, entries: {[key: string]: string;}, mode?: "sloppy" | "neat" | "strict") => string;

it's [nano](https://github.com/trix/nano)-like template engine with two differences - I'm using /% %/ as delimiters for template keys and there is no way to pass nested properties like obj.some.prop.to.fill.some.place.
Why /% %/? Because this is convenient way to use templates in js/ts code without breaking syntax. Look here:
```
import {sprintf} from 'gonzazoid.sprintf.js';

const generatePAC = function(_white_list: string[], proxy_host:string, checkURL: Function): string {

    const white_list = JSON.stringify(_white_list);

    function FindProxyForURL(url: string, host: string) {
        var white_list = JSON.parse('/%whiteListSource%/');
        var checkURL = /%checkURLSource%/;
        return (checkURL as any)(url, host, white_list) ? 'DIRECT' : 'HTTPS /%proxyURL%/';
    };

    const entries:{[index:string]:string} = {
        checkURLSource: checkURL.toString()
       ,whiteListSource: white_list
       ,proxyURL: proxy_host
    };

    return sprintf(FindProxyForURL.toString(), entries);
};
```
Pay attention to this line:
```
        var checkURL = /%checkURLSource%/;
```
as you can see template does'n break js/ts syntax because js/ts interpreter (and linter) perceives this as valid code with regular expression.

Keep in mind - if you try to pass serialized object (via JSON.stringify) quotes escaping (if it's necessary) is on your responsibility.

there are three mode:
* sloppy (default) - replaces with entries[key] whether entry is present or not (if not - replaces with undefined)
* neat - checks if entry is present, if not - doesn't touch
* strict - checks if  entry is present, if not - throws error

That's all! Enjoy!

P.S. as well as all my npm modules this module is [strongly typed](https://medium.com/@mweststrate/how-to-create-strongly-typed-npm-modules-1e1bda23a7f4), feel free to use it with typescript.
