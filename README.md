# <img src="https://img.shields.io/travis/gonzazoid/sprintf.js.svg"></img> <img src="https://img.shields.io/npm/v/gonzazoid.sprintf.js.svg"></img>

# sprinf.js

it's [nano](https://github.com/trix/nano)-like oneliner with two differences - I'm use /% %/ as delimiters for template keys and there is no way to pass nested properties like obj.some.prop.to.fill.some.place.
Why /% %/? Because this is convenient way to use in js/ts code without breaking syntax. Look here:
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
        '/%checkURLSource%/': checkURL.toString()
       ,'/%whiteListSource%/': white_list
       ,'/%proxyURL%/': proxy_host
    };

    return sprintf(FindProxyForURL.toString(), entries);
};
```
Pay attention to this line:
```
        var checkURL = /%checkURLSource%/;
```
as you can see template does'n break js/ts syntax because js/ts interpreter (and linter) perceives this as valid code with regular expression.
That's all! Enjoy!

P.S. as well as all my npm modules this module is strongly typed, feel free to use it with typescript.
